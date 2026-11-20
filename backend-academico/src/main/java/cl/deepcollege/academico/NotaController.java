package cl.deepcollege.academico;


import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/academico")
public class NotaController {
    private final NotaRepository notas;
    private final BloqueHorarioRepository horarios;
    private final AccesoService acceso;

    public NotaController(NotaRepository notas, BloqueHorarioRepository horarios, AccesoService acceso) {
        this.notas = notas;
        this.horarios = horarios;
        this.acceso = acceso;
    }

    /** valor = null borra esa casilla. */
    public record NotaItem(
        @NotNull Long estudianteId,
        @NotNull TipoNota tipo,
        @NotNull @Min(1) Integer posicion,
        @DecimalMin("1.0") @DecimalMax("7.0") BigDecimal valor) {}

    public record GuardarNotasRequest(
        @NotBlank @Size(max = 100) String asignatura,
        @NotEmpty List<@Valid NotaItem> notas) {}

    public record NotaResponse(Long estudianteId, String asignatura, TipoNota tipo, int posicion, BigDecimal valor) {
        static NotaResponse from(Nota n) {
            return new NotaResponse(n.getEstudianteId(), n.getAsignatura(), n.getTipo(), n.getPosicion(), n.getValor());
        }
    }

    /** Misma forma que datosDemoAcademicos.notas: { asignatura, ES: [], EF: [], ED: [] } */
    public record NotasAsignatura(String asignatura, List<BigDecimal> ES, List<BigDecimal> EF, List<BigDecimal> ED) {}

    // ---------- Estudiante / apoderado / directiva ----------
    @GetMapping("/estudiantes/{id}/notas")
    public List<NotasAsignatura> deEstudiante(@PathVariable Long id, Authentication auth,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        acceso.exigirVerEstudiante(auth, bearer, id);
        Map<String, List<Nota>> porAsignatura = notas
            .findByEstudianteIdOrderByAsignaturaAscTipoAscPosicionAsc(id).stream()
            .collect(Collectors.groupingBy(Nota::getAsignatura, LinkedHashMap::new, Collectors.toList()));

        return porAsignatura.entrySet().stream()
            .map(e -> new NotasAsignatura(e.getKey(),
                valores(e.getValue(), TipoNota.ES),
                valores(e.getValue(), TipoNota.EF),
                valores(e.getValue(), TipoNota.ED)))
            .toList();
    }

    /** Una entrada por casilla (ES 2, EF 2, ED 3). Las casillas sin nota van como null, para no correr las posiciones. */
    private static List<BigDecimal> valores(List<Nota> lista, TipoNota tipo) {
        Map<Integer, BigDecimal> porPosicion = lista.stream()
            .filter(n -> n.getTipo() == tipo)
            .collect(Collectors.toMap(Nota::getPosicion, Nota::getValor));
        return IntStream.rangeClosed(1, tipo.getMaxPosicion())
            .mapToObj(porPosicion::get)
            .toList();
    }

    // ---------- Docente / directiva ----------
    /** Asignaturas del curso (salen del horario y de notas ya registradas). */
    @GetMapping("/cursos/{curso}/asignaturas")
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    public List<String> asignaturas(@PathVariable String curso,
                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        acceso.idsEstudiantesDelCurso(bearer, c); // valida que el docente pueda ver ese curso
        Set<String> todas = new TreeSet<>(horarios.asignaturasDelCurso(c));
        todas.addAll(notas.asignaturasDelCurso(c));
        return List.copyOf(todas);
    }

    @GetMapping("/cursos/{curso}/notas")
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    public List<NotaResponse> delCurso(@PathVariable String curso, @RequestParam String asignatura,
                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        acceso.idsEstudiantesDelCurso(bearer, c);
        return notas.findByCursoAndAsignatura(c, asignatura.trim()).stream().map(NotaResponse::from).toList();
    }

    /** Guarda (crea, modifica o borra) varias casillas de un curso/asignatura de una vez. */
    @PutMapping("/cursos/{curso}/notas")
    @PreAuthorize("hasAnyRole('DOCENTE','DIRECTIVA')")
    @Transactional
    public List<NotaResponse> guardar(@PathVariable String curso, @Valid @RequestBody GuardarNotasRequest r,
                                      Authentication auth,
                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        String asignatura = r.asignatura().trim();
        acceso.exigirEstudiantesEnCurso(bearer, c, r.notas().stream().map(NotaItem::estudianteId).toList());

        Long docenteId = Long.valueOf(auth.getName());
        Map<String, Nota> existentes = notas.findByCursoAndAsignatura(c, asignatura).stream()
            .collect(Collectors.toMap(n -> clave(n.getEstudianteId(), n.getTipo(), n.getPosicion()), n -> n));

        for (NotaItem i : r.notas()) {
            if (i.posicion() > i.tipo().getMaxPosicion()) {
                throw new IllegalArgumentException(
                    "Posición inválida para " + i.tipo() + " (máximo " + i.tipo().getMaxPosicion() + ")");
            }
            Nota actual = existentes.get(clave(i.estudianteId(), i.tipo(), i.posicion()));
            if (i.valor() == null) {
                if (actual != null) notas.delete(actual);
            } else {
                BigDecimal valor = i.valor().setScale(1, RoundingMode.HALF_UP);
                if (actual == null) {
                    notas.save(new Nota(i.estudianteId(), c, asignatura, i.tipo(), i.posicion(), valor, docenteId));
                } else {
                    actual.actualizar(valor, docenteId);
                }
            }
        }
        return notas.findByCursoAndAsignatura(c, asignatura).stream().map(NotaResponse::from).toList();
    }

    private static String clave(Long estudianteId, TipoNota tipo, int posicion) {
        return estudianteId + "|" + tipo + "|" + posicion;
    }
}
