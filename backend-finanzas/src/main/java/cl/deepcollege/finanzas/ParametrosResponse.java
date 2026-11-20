package cl.deepcollege.finanzas;

import java.math.BigDecimal;

public record ParametrosResponse(BigDecimal valorHoraBasica, BigDecimal valorHoraMedia,
        BigDecimal bonoPorAnio, BigDecimal tasaAfp, BigDecimal tasaSalud, String moneda, String advertencia) {}
