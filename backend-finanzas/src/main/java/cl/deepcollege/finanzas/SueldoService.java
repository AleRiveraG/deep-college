package cl.deepcollege.finanzas;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class SueldoService {

    private final ParametrosSueldo parametros;
    private final CalculoSueldoRepository historial;

    public SueldoService(ParametrosSueldo parametros, CalculoSueldoRepository historial) {
        this.parametros = parametros;
        this.historial = historial;
    }

    public ParametrosResponse parametros() {
        return new ParametrosResponse(
                parametros.valorHoraBasica(),
                parametros.valorHoraMedia(),
                parametros.bonoPorAnio(),
                parametros.tasaAfp(),
                parametros.tasaSalud(),
                "CLP",
                "Simulación académica con las reglas del proyecto");
    }

    public ResultadoCalculo calcular(CalculoRequest datos, Long usuarioId) {
        BigDecimal valorHora = pesos(datos.nivel() == NivelEnsenanza.MEDIA
                ? parametros.valorHoraMedia()
                : parametros.valorHoraBasica());

        BigDecimal pagoHoras = valorHora.multiply(BigDecimal.valueOf(datos.horasSemanales()));

        BigDecimal bonoAnios = pesos(pagoHoras
                .multiply(parametros.bonoPorAnio())
                .multiply(BigDecimal.valueOf(datos.aniosAntiguedad())));

        BigDecimal sueldoBruto = pagoHoras.add(bonoAnios);
        BigDecimal afp = pesos(sueldoBruto.multiply(parametros.tasaAfp()));
        BigDecimal salud = pesos(sueldoBruto.multiply(parametros.tasaSalud()));
        BigDecimal sueldoLiquido = sueldoBruto.subtract(afp).subtract(salud);

        var resultado = new ResultadoCalculo(valorHora, parametros.bonoPorAnio(), parametros.tasaAfp(),
                parametros.tasaSalud(), pagoHoras, bonoAnios, sueldoBruto, afp, salud, sueldoLiquido);
        historial.save(new CalculoSueldo(usuarioId, datos, resultado));
        return resultado;
    }

    private BigDecimal pesos(BigDecimal monto) {
        return monto.setScale(0, RoundingMode.HALF_UP);
    }
}
