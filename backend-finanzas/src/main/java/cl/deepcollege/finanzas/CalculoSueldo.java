package cl.deepcollege.finanzas;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

/** Historial de cálculos de sueldo. Vive en el schema "finanzas" de Neon. */
@Entity
@Table(schema = "finanzas", name = "calculos_sueldo")
public class CalculoSueldo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** id del usuario DIRECTIVA en backend-usuarios. Sin FK a propósito: son servicios separados. */
    @Column(name = "usuario_id", nullable = false) private Long usuarioId;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 10) private NivelEnsenanza nivel;
    @Column(name = "horas_semanales", nullable = false) private int horasSemanales;
    @Column(name = "anios_antiguedad", nullable = false) private int aniosAntiguedad;
    @Column(name = "valor_hora", nullable = false, precision = 15, scale = 0) private BigDecimal valorHora;
    @Column(name = "pago_horas", nullable = false, precision = 15, scale = 0) private BigDecimal pagoHoras;
    @Column(name = "bono_anios", nullable = false, precision = 15, scale = 0) private BigDecimal bonoAnios;
    @Column(name = "sueldo_bruto", nullable = false, precision = 15, scale = 0) private BigDecimal sueldoBruto;
    @Column(nullable = false, precision = 15, scale = 0) private BigDecimal afp;
    @Column(nullable = false, precision = 15, scale = 0) private BigDecimal salud;
    @Column(name = "sueldo_liquido", nullable = false, precision = 15, scale = 0) private BigDecimal sueldoLiquido;
    @Column(nullable = false) private Instant fecha = Instant.now();

    protected CalculoSueldo() {}

    public CalculoSueldo(Long usuarioId, CalculoRequest datos, ResultadoCalculo r) {
        this.usuarioId = usuarioId;
        this.nivel = datos.nivel();
        this.horasSemanales = datos.horasSemanales();
        this.aniosAntiguedad = datos.aniosAntiguedad();
        this.valorHora = r.valorHora();
        this.pagoHoras = r.pagoHoras();
        this.bonoAnios = r.bonoAnios();
        this.sueldoBruto = r.sueldoBruto();
        this.afp = r.afp();
        this.salud = r.salud();
        this.sueldoLiquido = r.sueldoLiquido();
    }

    public Long getId() { return id; }
}
