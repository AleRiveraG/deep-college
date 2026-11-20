package cl.deepcollege.academico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Long> {
    List<Nota> findByEstudianteIdOrderByAsignaturaAscTipoAscPosicionAsc(Long estudianteId);

    List<Nota> findByCursoAndAsignatura(String curso, String asignatura);

    @Query("select distinct n.asignatura from Nota n where n.curso = :curso")
    List<String> asignaturasDelCurso(@Param("curso") String curso);
}
