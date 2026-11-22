package cl.deepcollege.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    boolean existsByApoderadoIdAndRolAndActivoTrue(Long apoderadoId, Rol rol);

    /** Busca por RUT ignorando puntos, espacios y mayúsculas. Recibe el RUT ya normalizado (sin puntos, K mayúscula). */
    @Query("select u from Usuario u where upper(replace(replace(u.rut, '.', ''), ' ', '')) = :rut")
    List<Usuario> buscarPorRutNormalizado(@Param("rut") String rut);
}
