package cl.deepcollege.usuarios;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api")
public class UsuarioController {
    private final UsuarioRepository usuarios;
    private final PasswordEncoder encoder;

    public UsuarioController(UsuarioRepository usuarios, PasswordEncoder encoder) {
        this.usuarios = usuarios;
        this.encoder = encoder;
    }

    @PostMapping("/usuarios")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('DIRECTIVA')")
    public UsuarioResponse crear(@Valid @RequestBody CrearUsuarioRequest r) {
        String correo = r.correo().trim().toLowerCase();
        String host = correo.substring(correo.indexOf('@') + 1);
        String expected = r.rol().name().toLowerCase() + ".deepcollege.cl";

        if (r.rol() != Rol.APODERADO && !host.equals(expected)) {
            throw new IllegalArgumentException(
                "El correo para el rol " + r.rol() + " debe pertenecer a @" + expected
            );
        }

        if (usuarios.existsByCorreoIgnoreCase(correo)) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }

        if (usuarios.existsByRutIgnoreCase(r.rut().trim())) {
            throw new IllegalArgumentException("El RUT ya está registrado");
        }

        Usuario apoderado = null;

        if (r.rol() == Rol.ESTUDIANTE) {
            if (r.apoderadoId() == null) {
                throw new IllegalArgumentException(
                    "El estudiante debe tener un apoderado asignado"
                );
            }

            apoderado = usuarios.findById(r.apoderadoId())
                .filter(u -> u.getRol() == Rol.APODERADO && u.isActivo())
                .orElseThrow(() -> new IllegalArgumentException(
                    "No existe un apoderado activo con ese id"
                ));

            if (r.curso() == null || r.curso().isBlank()) {
                throw new IllegalArgumentException(
                    "El estudiante debe tener un curso"
                );
            }
        }

        if (r.rol() == Rol.DOCENTE && !nivelDocenteValido(r.nivel())) {
            throw new IllegalArgumentException(
                "El nivel del docente debe ser BASICA, MEDIA o TODOS"
            );
        }

        Usuario guardado = usuarios.save(new Usuario(
            correo,
            encoder.encode(r.contrasena()),
            r.rol(),
            r.rut().trim(),
            r.nombres().trim(),
            r.apellidos().trim(),
            r.telefono(),
            r.fechaNacimiento(),
            r.curso(),
            r.nivel(),
            apoderado
        ));

        return UsuarioResponse.from(guardado);
    }

    @GetMapping("/usuarios/apoderados")
    @PreAuthorize("hasRole('DIRECTIVA')")
    public List<UsuarioResponse> listarApoderados() {
        return usuarios.findByRolAndActivoTrue(Rol.APODERADO)
            .stream()
            .map(UsuarioResponse::from)
            .toList();
    }

    @GetMapping("/usuarios/me")
    public UsuarioResponse me(Authentication auth) {
        return UsuarioResponse.from(current(auth));
    }

    @PutMapping("/usuarios/me")
    public UsuarioResponse actualizar(
        @Valid @RequestBody PerfilRequest request,
        Authentication auth
    ) {
        Usuario user = current(auth);

        if (!user.getRut().equalsIgnoreCase(request.rut().trim())
            && usuarios.existsByRutIgnoreCase(request.rut().trim())) {
            throw new IllegalArgumentException("El RUT ya está registrado");
        }

        if (user.getRol() == Rol.DOCENTE
            && request.nivel() != null
            && !nivelDocenteValido(request.nivel())) {
            throw new IllegalArgumentException(
                "El nivel del docente debe ser BASICA, MEDIA o TODOS"
            );
        }

        user.actualizar(request);
        return UsuarioResponse.from(usuarios.save(user));
    }

    @GetMapping("/usuarios")
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    public List<UsuarioResponse> listar(
        @RequestParam(required = false) Rol rol,
        @RequestParam(required = false) String curso,
        Authentication auth
    ) {
        Rol solicitado = rol == null ? Rol.ESTUDIANTE : rol;

        if (solicitado != Rol.ESTUDIANTE) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Solo se pueden consultar perfiles de estudiantes"
            );
        }

        boolean esDocente = auth.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_DOCENTE"));

        if (esDocente && (curso == null || curso.isBlank())) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "El docente debe indicar el curso"
            );
        }

        if (esDocente) {
            Usuario docente = current(auth);

            if (!docentePuedeVerCurso(docente.getNivel(), curso)) {
                throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Tu nivel de enseñanza no permite consultar ese curso"
                );
            }
        }

        List<Usuario> encontrados =
            (curso == null || curso.isBlank())
                ? usuarios.findByRolAndActivoTrue(solicitado)
                : usuarios.findByRolAndCursoIgnoreCaseAndActivoTrue(
                    solicitado,
                    curso.trim()
                );

        return encontrados.stream()
            .map(UsuarioResponse::from)
            .toList();
    }

    @GetMapping("/apoderados/me/pupilos")
    @PreAuthorize("hasRole('APODERADO')")
    public List<UsuarioResponse> pupilos(Authentication auth) {
        Long apoderadoId = Long.valueOf(auth.getName());

        return usuarios.findByApoderadoIdAndRolAndActivoTrue(
                apoderadoId,
                Rol.ESTUDIANTE
            )
            .stream()
            .map(UsuarioResponse::from)
            .toList();
    }

    private Usuario current(Authentication auth) {
        return usuarios.findById(Long.valueOf(auth.getName()))
            .filter(Usuario::isActivo)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Usuario no encontrado"
            ));
    }

    private boolean nivelDocenteValido(String nivel) {
        String normalizado = normalizar(nivel);

        return normalizado.contains("basica")
            || normalizado.contains("basico")
            || normalizado.contains("media")
            || normalizado.contains("medio")
            || normalizado.contains("todo")
            || normalizado.contains("ambos");
    }

    private boolean docentePuedeVerCurso(String nivel, String curso) {
        String nivelNormalizado = normalizar(nivel);
        String cursoNormalizado = normalizar(curso);

        boolean todos = nivelNormalizado.contains("todo")
            || nivelNormalizado.contains("ambos");
        boolean cursoBasico = cursoNormalizado.endsWith("-basico");
        boolean cursoMedio = cursoNormalizado.endsWith("-medio");

        if (todos) {
            return cursoBasico || cursoMedio;
        }

        boolean docenteBasica =
            nivelNormalizado.contains("basica")
                || nivelNormalizado.contains("basico");
        boolean docenteMedia =
            nivelNormalizado.contains("media")
                || nivelNormalizado.contains("medio");

        return (docenteBasica && cursoBasico)
            || (docenteMedia && cursoMedio);
    }

    private String normalizar(String texto) {
        if (texto == null) {
            return "";
        }

        return Normalizer.normalize(texto, Normalizer.Form.NFD)
            .replaceAll("\\p{M}+", "")
            .trim()
            .toLowerCase(Locale.ROOT);
    }
}