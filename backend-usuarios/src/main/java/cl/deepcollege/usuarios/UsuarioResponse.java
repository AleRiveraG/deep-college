package cl.deepcollege.usuarios;

import java.time.LocalDate;

public record UsuarioResponse(Long id, String correo, Rol rol, String rut, String nombres, String apellidos,
                              String telefono, LocalDate fechaNacimiento, String curso, String nivel, Long apoderadoId) {
    public static UsuarioResponse from(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getCorreo(), u.getRol(), u.getRut(), u.getNombres(), u.getApellidos(),
            u.getTelefono(), u.getFechaNacimiento(), u.getCurso(), u.getNivel(),
            u.getApoderado() == null ? null : u.getApoderado().getId());
    }
}
