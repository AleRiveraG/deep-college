package cl.deepcollege.usuarios;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PostulacionResponse(
    Long id,
    String nombresPostulante,
    String apellidosPostulante,
    String rutPostulante,
    LocalDate fechaNacimiento,
    String curso,
    String nombresApoderado,
    String apellidosApoderado,
    String rutApoderado,
    String correoApoderado,
    String telefonoApoderado,
    String observaciones,
    EstadoPostulacion estado,
    LocalDateTime creadaEn,
    Long estudianteUsuarioId,
    Long apoderadoUsuarioId
) {
    public static PostulacionResponse from(Postulacion p) {
        return new PostulacionResponse(
            p.getId(),
            p.getNombresPostulante(),
            p.getApellidosPostulante(),
            p.getRutPostulante(),
            p.getFechaNacimiento(),
            p.getCurso(),
            p.getNombresApoderado(),
            p.getApellidosApoderado(),
            p.getRutApoderado(),
            p.getCorreoApoderado(),
            p.getTelefonoApoderado(),
            p.getObservaciones(),
            p.getEstado(),
            p.getCreadaEn(),
            p.getEstudianteUsuarioId(),
            p.getApoderadoUsuarioId()
        );
    }
}