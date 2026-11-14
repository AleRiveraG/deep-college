package cl.deepcollege.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreoIgnoreCase(String correo);
    Optional<Usuario> findByRutIgnoreCase(String rut);

    boolean existsByCorreoIgnoreCase(String correo);
    boolean existsByRutIgnoreCase(String rut);

    List<Usuario> findByRolAndCursoIgnoreCaseAndActivoTrue(Rol rol, String curso);
    List<Usuario> findByRolAndActivoTrue(Rol rol);
    List<Usuario> findByApoderadoIdAndRolAndActivoTrue(Long apoderadoId, Rol rol);
}
