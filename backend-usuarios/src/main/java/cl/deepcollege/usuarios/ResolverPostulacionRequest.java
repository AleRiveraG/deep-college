package cl.deepcollege.usuarios;

import jakarta.validation.constraints.*;

public record ResolverPostulacionRequest(
    @NotNull AccionPostulacion accion,
    @Email @Size(max = 180) String correoEstudiante,
    @Size(min = 8, max = 100) String contrasenaEstudiante,
    @Size(min = 8, max = 100) String contrasenaApoderado
) {
    public enum AccionPostulacion {
        APROBAR,
        RECHAZAR
    }
}