package cl.deepcollege.finanzas;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CalculoRequest(
        @NotNull @Min(1) @Max(42) Integer horasSemanales,
        @NotNull @Min(0) @Max(50) Integer aniosAntiguedad,
        @NotNull NivelEnsenanza nivel
) {}
