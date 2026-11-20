package cl.deepcollege.academico;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {
    List<Asistencia> findByEstudianteIdOrderByFechaAsc(Long estudianteId);

    List<Asistencia> findByCursoAndFecha(String curso, LocalDate fecha);

    List<Asistencia> findByEstudianteIdInAndFecha(Collection<Long> estudianteIds, LocalDate fecha);
}
