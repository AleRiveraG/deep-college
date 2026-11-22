package cl.deepcollege.usuarios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PostulacionRepository extends JpaRepository<Postulacion, Long> {
    List<Postulacion> findByEstadoOrderByCreadaEnAsc(EstadoPostulacion estado);

    /** Postulaciones de un apoderado (por RUT sin puntos ni espacios, K mayúscula), las más nuevas primero. */
    @Query("select p from Postulacion p where upper(replace(replace(p.rutApoderado, '.', ''), ' ', '')) = :rut order by p.creadaEn desc")
    List<Postulacion> buscarPorRutApoderadoNormalizado(@Param("rut") String rut);

    /** Cuántas postulaciones hay de un alumno (RUT normalizado) en cierto estado. */
    @Query("select count(p) from Postulacion p where upper(replace(replace(p.rutPostulante, '.', ''), ' ', '')) = :rut and p.estado = :estado")
    long contarPorRutPostulanteNormalizado(@Param("rut") String rut, @Param("estado") EstadoPostulacion estado);
}