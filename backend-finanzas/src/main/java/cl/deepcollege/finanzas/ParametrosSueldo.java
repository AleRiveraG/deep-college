package cl.deepcollege.finanzas;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.validation.annotation.Validated;

import java.math.BigDecimal;

/** Valores configurables en application.yml (prefijo finanzas.parametros). */
@Validated
@ConfigurationProperties(prefix = "finanzas.parametros")
public record ParametrosSueldo(
        @DefaultValue("19992") @NotNull @Positive @Digits(integer = 13, fraction = 0) BigDecimal valorHoraBasica,
        @DefaultValue("21034") @NotNull @Positive @Digits(integer = 13, fraction = 0) BigDecimal valorHoraMedia,
        @DefaultValue("0.015") @NotNull @Digits(integer = 1, fraction = 6) @DecimalMin("0") @DecimalMax("1") BigDecimal bonoPorAnio,
        @DefaultValue("0.10") @NotNull @Digits(integer = 1, fraction = 6) @DecimalMin("0") @DecimalMax("1") BigDecimal tasaAfp,
        @DefaultValue("0.07") @NotNull @Digits(integer = 1, fraction = 6) @DecimalMin("0") @DecimalMax("1") BigDecimal tasaSalud
) {
    @AssertTrue(message = "AFP y salud no pueden superar 100% en conjunto")
    public boolean isTasasValidas() {
        return tasaAfp == null || tasaSalud == null || tasaAfp.add(tasaSalud).compareTo(BigDecimal.ONE) <= 0;
    }
}
