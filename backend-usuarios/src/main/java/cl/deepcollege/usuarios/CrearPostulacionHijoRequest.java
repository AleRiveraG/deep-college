package cl.deepcollege.usuarios;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

/** Postulación de otro hijo/a hecha por un apoderado con sesión iniciada (los datos del apoderado salen de su cuenta). */
public record CrearPostulacionHijoRequest(
    @NotBlank @Size(max = 100) String nombresPostulante,
    @NotBlank @Size(max = 100) String apellidosPostulante,
    @NotBlank @Pattern(regexp = "(?i)\\d{1,2}\\.?\\d{3}\\.?\\d{3}-[0-9k]") String rutPostulante,
    @NotNull @Past LocalDate fechaNacimiento,
    @NotBlank @Size(max = 80) String curso,
    @Size(max = 1900) String observaciones,
    @AssertTrue(message = "Debes autorizar el uso de los datos") boolean aceptaUsoDatos
) {}
