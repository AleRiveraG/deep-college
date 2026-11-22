package cl.deepcollege.usuarios;

/** Lo que ve la directiva al revisar una postulación cuyo RUT de apoderado ya tiene cuenta. */
public record ApoderadoExistenteResponse(
    Long id,
    Rol rol,
    String nombres,
    String apellidos,
    String correo,
    String telefono,
    boolean activo,
    int alumnosActivos,
    boolean correoCoincide,
    boolean nombreCoincide
) {}
