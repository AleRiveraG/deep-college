package cl.deepcollege.academico;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/academico")
public class AsistenciaController {
    private final AsistenciaRepository asistencias;
    private final AccesoService acceso;

    public AsistenciaController(AsistenciaRepository asistencias, AccesoService acceso) {
        this.asistencias = asistencias;
        this.acceso = acceso;
    }

    public record RegistroItem(@NotNull Long estudianteId, @NotNull EstadoAsistencia estado) {}

    public record RegistrarAsistenciaRequest(
        @NotNull LocalDate fecha,
        @NotEmpty List<@Valid RegistroItem> registros) {}

    public record AsistenciaResponse(Long estudianteId, LocalDate fecha, EstadoAsistencia estado) {
        static AsistenciaResponse from(Asistencia a) {
            return new AsistenciaResponse(a.getEstudianteId(), a.getFecha(), a.getEstado());
        }
    }

    /** Misma forma que datosDemoAcademicos.asistencia */
    public record ResumenAsistencia(int totalClases, List<LocalDate> inasistencias) {}

    // ---------- Estudiante / apoderado / directiva ----------
    @GetMapping("/estudiantes/{id}/asistencia")
    public ResumenAsistencia deEstudiante(@PathVariable Long id, Authentication auth,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        acceso.exigirVerEstudiante(auth, bearer, id);
        List<Asistencia> lista = asistencias.findByEstudianteIdOrderByFechaAsc(id);
        return new ResumenAsistencia(
            lista.size(),
            lista.stream().filter(a -> a.getEstado() == EstadoAsistencia.AUSENTE).map(Asistencia::getFecha).toList());
    }

    // ---------- Docente / directiva ----------
    @GetMapping("/cursos/{curso}/asistencia")
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    public List<AsistenciaResponse> delCurso(@PathVariable String curso,
                                             @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fecha,
                                             @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        acceso.idsEstudiantesDelCurso(bearer, c);
        return asistencias.findByCursoAndFecha(c, fecha).stream().map(AsistenciaResponse::from).toList();
    }

    /** Registra (o corrige) la asistencia de un día completo. */
    @PutMapping("/cursos/{curso}/asistencia")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    @Transactional
    public void registrar(@PathVariable String curso, @Valid @RequestBody RegistrarAsistenciaRequest r,
                          Authentication auth, @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        if (r.fecha().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("No se puede registrar asistencia de una fecha futura");
        }
        List<Long> ids = r.registros().stream().map(RegistroItem::estudianteId).toList();
        acceso.exigirEstudiantesEnCurso(bearer, c, ids);

        Long docenteId = Long.valueOf(auth.getName());
        Map<Long, Asistencia> existentes = asistencias.findByEstudianteIdInAndFecha(ids, r.fecha()).stream()
            .collect(Collectors.toMap(Asistencia::getEstudianteId, Function.identity()));

        for (RegistroItem i : r.registros()) {
            Asistencia actual = existentes.get(i.estudianteId());
            if (actual == null) {
                asistencias.save(new Asistencia(i.estudianteId(), c, r.fecha(), i.estado(), docenteId));
            } else {
                actual.actualizar(c, i.estado(), docenteId);
            }
        }
    }
}
