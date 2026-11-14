package cl.deepcollege.usuarios;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record CrearPostulacionRequest(
    @NotBlank @Size(max = 100) String nombresPostulante,
    @NotBlank @Size(max = 100) String apellidosPostulante,
    @NotBlank @Pattern(regexp = "(?i)\\d{1,2}\\.?\\d{3}\\.?\\d{3}-[0-9k]") String rutPostulante,
    @NotNull @Past LocalDate fechaNacimiento,
    @NotBlank @Size(max = 80) String curso,
    @NotBlank @Size(max = 100) String nombresApoderado,
    @NotBlank @Size(max = 100) String apellidosApoderado,
    @NotBlank @Pattern(regexp = "(?i)\\d{1,2}\\.?\\d{3}\\.?\\d{3}-[0-9k]") String rutApoderado,
    @NotBlank @Email @Size(max = 180) String correoApoderado,
    @NotBlank @Size(max = 30) String telefonoApoderado,
    @Size(max = 2000) String observaciones,
    @AssertTrue(message = "Debes autorizar el uso de los datos") boolean aceptaUsoDatos
) {}