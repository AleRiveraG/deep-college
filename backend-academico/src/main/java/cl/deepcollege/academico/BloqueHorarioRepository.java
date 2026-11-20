package cl.deepcollege.academico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BloqueHorarioRepository extends JpaRepository<BloqueHorario, Long> {
    List<BloqueHorario> findByCurso(String curso);

    @Query("select distinct b.asignatura from BloqueHorario b where b.curso = :curso")
    List<String> asignaturasDelCurso(@Param("curso") String curso);

    // Borrado masivo inmediato (el derivado deleteBy... haría los INSERT antes que los DELETE y chocaría con el unique).
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("delete from BloqueHorario b where b.curso = :curso")
    void borrarPorCurso(@Param("curso") String curso);
}
