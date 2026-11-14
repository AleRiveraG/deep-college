package cl.deepcollege.usuarios;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

        validarCredencialesAprobacion(request);

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

        if (usuarios.existsByRutIgnoreCase(p.getRutPostulante())) {
            throw new IllegalArgumentException("El RUT del estudiante ya tiene una cuenta");
        }

        Usuario apoderado = obtenerOCrearApoderado(p, request.contrasenaApoderado());

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

    private void validarCredencialesAprobacion(ResolverPostulacionRequest request) {
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

        if (request.contrasenaApoderado() == null
            || request.contrasenaApoderado().length() < 8) {
            throw new IllegalArgumentException(
                "La contraseña inicial del apoderado debe tener al menos 8 caracteres"
            );
        }
    }

    private Usuario obtenerOCrearApoderado(
        Postulacion p,
        String contrasenaInicial
    ) {
        String correo = p.getCorreoApoderado().trim().toLowerCase();
        var porRut = usuarios.findByRutIgnoreCase(p.getRutApoderado());

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
}