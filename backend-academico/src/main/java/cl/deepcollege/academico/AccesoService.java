package cl.deepcollege.academico;

import cl.deepcollege.academico.UsuariosClient.UsuarioDto;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;

/** Reglas de "quién puede ver qué". Ningún controlador decide permisos por su cuenta. */
@Service
public class AccesoService {
    private final UsuariosClient usuarios;

    public AccesoService(UsuariosClient usuarios) {
        this.usuarios = usuarios;
    }

    public static String normalizarCurso(String curso) {
        return curso.trim().toLowerCase(Locale.ROOT);
    }

    private static boolean tiene(Authentication a, String rol) {
        return a.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_" + rol));
    }

    private static ResponseStatusException prohibido() {
        return new ResponseStatusException(HttpStatus.FORBIDDEN, "No tienes permiso para ver esa información");
    }

    /** DIRECTIVA ve a todos; ESTUDIANTE solo a sí mismo; APODERADO solo a sus pupilos. */
    public void exigirVerEstudiante(Authentication a, String bearer, Long estudianteId) {
        if (tiene(a, "DIRECTIVA")) return;
        if (tiene(a, "ESTUDIANTE") && a.getName().equals(String.valueOf(estudianteId))) return;
        if (tiene(a, "APODERADO")
            && usuarios.pupilos(bearer).stream().anyMatch(p -> estudianteId.equals(p.id()))) return;
        throw prohibido();
    }

    /** Para ver el horario de un curso. */
    public void exigirVerCurso(Authentication a, String bearer, String curso) {
        if (tiene(a, "DIRECTIVA")) return;
        if (tiene(a, "DOCENTE")) {
            usuarios.estudiantesDeCurso(bearer, curso); // backend-usuarios responde 403 si el nivel no corresponde
            return;
        }
        if (tiene(a, "ESTUDIANTE") && curso.equalsIgnoreCase(usuarios.perfil(bearer).curso())) return;
        if (tiene(a, "APODERADO")
            && usuarios.pupilos(bearer).stream().anyMatch(p -> curso.equalsIgnoreCase(p.curso()))) return;
        throw prohibido();
    }

    /** Solo para DOCENTE/DIRECTIVA (ya filtrado con @PreAuthorize). Devuelve los ids de los estudiantes del curso. */
    public List<Long> idsEstudiantesDelCurso(String bearer, String curso) {
        return usuarios.estudiantesDeCurso(bearer, curso).stream().map(UsuarioDto::id).toList();
    }

    public void exigirEstudiantesEnCurso(String bearer, String curso, Collection<Long> ids) {
        var validos = new HashSet<>(idsEstudiantesDelCurso(bearer, curso));
        if (!validos.containsAll(ids)) {
            throw new IllegalArgumentException("Hay estudiantes que no pertenecen a ese curso");
        }
    }
}
