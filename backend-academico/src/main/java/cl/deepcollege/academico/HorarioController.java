package cl.deepcollege.academico;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/academico")
public class HorarioController {
    private final BloqueHorarioRepository bloques;
    private final AccesoService acceso;

    public HorarioController(BloqueHorarioRepository bloques, AccesoService acceso) {
        this.bloques = bloques;
        this.acceso = acceso;
    }

    public record BloqueRequest(
        @NotNull @Min(1) @Max(5) Integer dia,
        @NotBlank @Pattern(regexp = "^\\d{2}:\\d{2}-\\d{2}:\\d{2}$", message = "Formato HH:mm-HH:mm") String modulo,
        @NotBlank @Size(max = 100) String asignatura) {}

    public record ActualizarHorarioRequest(@NotNull List<@Valid BloqueRequest> bloques) {}

    /** Misma forma que datosDemoAcademicos.horario: { modulo, clases: [lun, mar, mié, jue, vie] } */
    public record FilaHorario(String modulo, List<String> clases) {}

    @GetMapping("/cursos/{curso}/horario")
    public List<FilaHorario> ver(@PathVariable String curso, Authentication auth,
                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String bearer) {
        String c = AccesoService.normalizarCurso(curso);
        acceso.exigirVerCurso(auth, bearer, c);
        return armar(bloques.findByCurso(c));
    }

    /** Reemplaza el horario completo del curso. Solo DIRECTIVA. */
    @PutMapping("/cursos/{curso}/horario")
    @PreAuthorize("hasRole('DIRECTIVA')")
    @Transactional
    public List<FilaHorario> actualizar(@PathVariable String curso, @Valid @RequestBody ActualizarHorarioRequest r) {
        String c = AccesoService.normalizarCurso(curso);

        Set<String> vistos = new HashSet<>();
        for (BloqueRequest b : r.bloques()) {
            if (!vistos.add(b.dia() + "|" + b.modulo())) {
                throw new IllegalArgumentException(
                    "Hay dos clases en el mismo día y módulo (día " + b.dia() + ", " + b.modulo() + ")");
            }
        }

        bloques.borrarPorCurso(c);
        bloques.saveAll(r.bloques().stream()
            .map(b -> new BloqueHorario(c, b.dia(), b.modulo(), b.asignatura().trim()))
            .toList());
        return armar(bloques.findByCurso(c));
    }

    private static List<FilaHorario> armar(List<BloqueHorario> lista) {
        Map<String, String[]> filas = new TreeMap<>();
        for (BloqueHorario b : lista) {
            filas.computeIfAbsent(b.getModulo(), k -> new String[5])[b.getDia() - 1] = b.getAsignatura();
        }
        return filas.entrySet().stream()
            .map(e -> new FilaHorario(e.getKey(),
                Arrays.stream(e.getValue()).map(x -> x == null ? "" : x).toList()))
            .toList();
    }
}
