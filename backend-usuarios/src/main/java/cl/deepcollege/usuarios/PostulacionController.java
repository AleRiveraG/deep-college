package cl.deepcollege.usuarios;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/api/postulaciones")
public class PostulacionController {
    private final PostulacionRepository postulaciones;
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;

    public PostulacionController(
        PostulacionRepository postulaciones,
        UsuarioRepository usuarios,
        PasswordEncoder encoder
    ) {
        this.postulaciones = postulaciones;
        this.usuarios = usuarios;
        this.encoder = encoder;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public PostulacionResponse crear(@Valid @RequestBody CrearPostulacionRequest request) {
        Postulacion postulacion = postulaciones.save(new Postulacion(request));
        return PostulacionResponse.from(postulacion);
    }

    /**
     * Apoderado con sesión iniciada postula a otro hijo/a. Sus datos (nombre, RUT, correo, teléfono)
     * salen de su cuenta, así que el alumno queda ligado al mismo apoderado al aprobarse.
     */
    @PostMapping("/apoderado")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('APODERADO')")
    @Transactional
    public PostulacionResponse crearComoApoderado(
        @Valid @RequestBody CrearPostulacionHijoRequest request,
        Authentication auth
    ) {
        Usuario apoderado = apoderadoActual(auth);

        if (buscarPorRut(request.rutPostulante()).isPresent()) {
            throw new IllegalArgumentException("Ese RUT ya tiene una cuenta en el colegio");
        }

        if (postulaciones.contarPorRutPostulanteNormalizado(
                normalizarRut(request.rutPostulante()),
                EstadoPostulacion.PENDIENTE) > 0) {
            throw new IllegalArgumentException("Ya existe una postulación pendiente para ese RUT");
        }

        String observaciones = "Enviada desde la cuenta del apoderado."
            + (request.observaciones() == null || request.observaciones().isBlank()
                ? ""
                : " " + request.observaciones().trim());

        CrearPostulacionRequest completa = new CrearPostulacionRequest(
            request.nombresPostulante(),
            request.apellidosPostulante(),
            request.rutPostulante(),
            request.fechaNacimiento(),
            request.curso(),
            apoderado.getNombres(),
            apoderado.getApellidos(),
            apoderado.getRut(),
            apoderado.getCorreo(),
            apoderado.getTelefono() == null ? "" : apoderado.getTelefono(),
            observaciones,
            true
        );

        return PostulacionResponse.from(postulaciones.save(new Postulacion(completa)));
    }

    /** Postulaciones enviadas por el apoderado con sesión iniciada (para que vea su estado). */
    @GetMapping("/apoderado/mias")
    @PreAuthorize("hasRole('APODERADO')")
    @Transactional(readOnly = true)
    public List<PostulacionResponse> misPostulaciones(Authentication auth) {
        Usuario apoderado = apoderadoActual(auth);

        return postulaciones
            .buscarPorRutApoderadoNormalizado(normalizarRut(apoderado.getRut()))
            .stream()
            .filter(p -> p.getCorreoApoderado().equalsIgnoreCase(apoderado.getCorreo()))
            .map(PostulacionResponse::from)
            .toList();
    }

    @GetMapping
    @PreAuthorize("hasRole('DIRECTIVA')")
    @Transactional(readOnly = true)
    public List<PostulacionResponse> listar(
        @RequestParam(required = false) EstadoPostulacion estado
    ) {
        EstadoPostulacion filtro =
            estado == null ? EstadoPostulacion.PENDIENTE : estado;

        return postulaciones.findByEstadoOrderByCreadaEnAsc(filtro)
            .stream()
            .map(PostulacionResponse::from)
            .toList();
    }

    /**
     * Solo directiva. Indica si el RUT del apoderado de la postulación ya tiene una cuenta
     * (204 si no existe), para que la directiva vea a quién se va a vincular el alumno.
     */
    @GetMapping("/{id}/apoderado")
    @PreAuthorize("hasRole('DIRECTIVA')")
    @Transactional(readOnly = true)
    public ResponseEntity<ApoderadoExistenteResponse> apoderadoExistente(@PathVariable Long id) {
        Postulacion p = postulaciones.findById(id)
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Postulación no encontrada")
            );

        Optional<Usuario> encontrado = buscarPorRut(p.getRutApoderado());

        if (encontrado.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        Usuario a = encontrado.get();
        int alumnos = usuarios
            .findByApoderadoIdAndRolAndActivoTrue(a.getId(), Rol.ESTUDIANTE)
            .size();

        return ResponseEntity.ok(new ApoderadoExistenteResponse(
            a.getId(),
            a.getRol(),
            a.getNombres(),
            a.getApellidos(),
            a.getCorreo(),
            a.getTelefono(),
            a.isActivo(),
            alumnos,
            a.getCorreo().equalsIgnoreCase(p.getCorreoApoderado()),
            normalizarTexto(a.getNombres() + " " + a.getApellidos())
                .equals(normalizarTexto(p.getNombresApoderado() + " " + p.getApellidosApoderado()))
        ));
    }

    @PostMapping("/{id}/resolver")
    @PreAuthorize("hasRole('DIRECTIVA')")
    @Transactional
    public PostulacionResponse resolver(
        @PathVariable Long id,
        @Valid @RequestBody ResolverPostulacionRequest request
    ) {
        Postulacion p = postulaciones.findById(id)
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Postulación no encontrada")
            );

        if (p.getEstado() != EstadoPostulacion.PENDIENTE) {
            throw new IllegalArgumentException("La postulación ya fue resuelta");
        }

        if (request.accion() == ResolverPostulacionRequest.AccionPostulacion.RECHAZAR) {
            p.resolver(EstadoPostulacion.RECHAZADA, null, null);
            return PostulacionResponse.from(p);
        }

        Optional<Usuario> apoderadoExistente = buscarPorRut(p.getRutApoderado());

        // la contraseña del apoderado solo se pide si su cuenta es nueva o estaba dada de baja
        boolean requiereClaveApoderado =
            apoderadoExistente.isEmpty() || !apoderadoExistente.get().isActivo();

        validarCredencialesAprobacion(request, requiereClaveApoderado);

        String correoEstudiante = request.correoEstudiante().trim().toLowerCase();
        String host = correoEstudiante.substring(correoEstudiante.indexOf('@') + 1);

        if (!host.equals("estudiante.deepcollege.cl")) {
            throw new IllegalArgumentException(
                "El estudiante debe tener correo @estudiante.deepcollege.cl"
            );
        }

        if (usuarios.existsByCorreoIgnoreCase(correoEstudiante)) {
            throw new IllegalArgumentException("El correo del estudiante ya está registrado");
        }

        if (buscarPorRut(p.getRutPostulante()).isPresent()) {
            throw new IllegalArgumentException("El RUT del estudiante ya tiene una cuenta");
        }

        Usuario apoderado = obtenerOCrearApoderado(
            p,
            request.contrasenaApoderado(),
            apoderadoExistente
        );

        Usuario estudiante = usuarios.save(new Usuario(
            correoEstudiante,
            encoder.encode(request.contrasenaEstudiante()),
            Rol.ESTUDIANTE,
            p.getRutPostulante(),
            p.getNombresPostulante(),
            p.getApellidosPostulante(),
            null,
            p.getFechaNacimiento(),
            p.getCurso(),
            null,
            apoderado
        ));

        p.resolver(
            EstadoPostulacion.ACEPTADA,
            estudiante.getId(),
            apoderado.getId()
        );

        return PostulacionResponse.from(p);
    }

    private void validarCredencialesAprobacion(
        ResolverPostulacionRequest request,
        boolean requiereClaveApoderado
    ) {
        if (request.correoEstudiante() == null || request.correoEstudiante().isBlank()) {
            throw new IllegalArgumentException(
                "Debes asignar un correo institucional al estudiante"
            );
        }

        if (request.contrasenaEstudiante() == null
            || request.contrasenaEstudiante().length() < 8) {
            throw new IllegalArgumentException(
                "La contraseña inicial del estudiante debe tener al menos 8 caracteres"
            );
        }

        if (requiereClaveApoderado
            && (request.contrasenaApoderado() == null
                || request.contrasenaApoderado().length() < 8)) {
            throw new IllegalArgumentException(
                "La contraseña inicial del apoderado debe tener al menos 8 caracteres"
            );
        }
    }

    private Usuario obtenerOCrearApoderado(
        Postulacion p,
        String contrasenaInicial,
        Optional<Usuario> porRut
    ) {
        String correo = p.getCorreoApoderado().trim().toLowerCase();

        if (porRut.isPresent()) {
            Usuario existente = porRut.get();

            if (existente.getRol() != Rol.APODERADO) {
                throw new IllegalArgumentException(
                    "El RUT del apoderado ya pertenece a una cuenta de otro rol"
                );
            }

            if (!existente.getCorreo().equalsIgnoreCase(correo)) {
                throw new IllegalArgumentException(
                    "El RUT del apoderado ya está asociado a otro correo"
                );
            }

            if (!existente.isActivo()) {
                // apoderado dado de baja que vuelve a matricular: se reactiva con la contraseña nueva
                existente.reactivar(encoder.encode(contrasenaInicial));
            }

            return existente;
        }

        if (usuarios.existsByCorreoIgnoreCase(correo)) {
            throw new IllegalArgumentException(
                "El correo del apoderado ya está asociado a otra cuenta"
            );
        }

        return usuarios.save(new Usuario(
            correo,
            encoder.encode(contrasenaInicial),
            Rol.APODERADO,
            p.getRutApoderado(),
            p.getNombresApoderado(),
            p.getApellidosApoderado(),
            p.getTelefonoApoderado(),
            null,
            null,
            null,
            null
        ));
    }

    private Usuario apoderadoActual(Authentication auth) {
        return usuarios.findById(Long.valueOf(auth.getName()))
            .filter(u -> u.getRol() == Rol.APODERADO && u.isActivo())
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.FORBIDDEN, "Apoderado no encontrado o dado de baja")
            );
    }

    /** Busca una cuenta por RUT sin importar si viene con puntos, espacios o la K en minúscula. */
    private Optional<Usuario> buscarPorRut(String rut) {
        return usuarios.buscarPorRutNormalizado(normalizarRut(rut)).stream().findFirst();
    }

    private static String normalizarRut(String rut) {
        return rut == null
            ? ""
            : rut.replace(".", "").replace(" ", "").trim().toUpperCase(Locale.ROOT);
    }

    private static String normalizarTexto(String texto) {
        if (texto == null) {
            return "";
        }

        return Normalizer.normalize(texto, Normalizer.Form.NFD)
            .replaceAll("\\p{M}+", "")
            .replaceAll("\\s+", " ")
            .trim()
            .toLowerCase(Locale.ROOT);
    }
}
