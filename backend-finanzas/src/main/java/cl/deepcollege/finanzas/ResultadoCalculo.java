package cl.deepcollege.finanzas;

import java.math.BigDecimal;

public record ResultadoCalculo(BigDecimal valorHora, BigDecimal bonoPorAnio,
        BigDecimal tasaAfp, BigDecimal tasaSalud, BigDecimal pagoHoras, BigDecimal bonoAnios,
        BigDecimal sueldoBruto, BigDecimal afp, BigDecimal salud, BigDecimal sueldoLiquido) {}
