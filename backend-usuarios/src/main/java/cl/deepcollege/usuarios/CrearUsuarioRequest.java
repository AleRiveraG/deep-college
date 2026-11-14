package cl.deepcollege.usuarios;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record CrearUsuarioRequest(
    @NotBlank @Email @Size(max=180) String correo,
    @NotBlank @Size(min=8,max=100) String contrasena,
    @NotNull Rol rol,
    @NotBlank @Pattern(regexp="(?i)\\d{1,2}\\.?\\d{3}\\.?\\d{3}-[0-9k]") String rut,
    @NotBlank @Size(max=100) String nombres,
    @NotBlank @Size(max=100) String apellidos,
    @Size(max=30) String telefono,
    @Past LocalDate fechaNacimiento,
    @Size(max=80) String curso,
    @Size(max=80) String nivel,
    Long apoderadoId
) {}
