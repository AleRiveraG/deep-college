package cl.deepcollege.academico;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(schema = "academico", name = "notas",
    uniqueConstraints = @UniqueConstraint(name = "uk_nota_casilla",
        columnNames = {"estudiante_id", "curso", "asignatura", "tipo", "posicion"}))
public class Nota {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /** id del estudiante en backend-usuarios. Sin FK a propósito: son servicios separados. */
    @Column(name = "estudiante_id", nullable = false) private Long estudianteId;
    @Column(nullable = false, length = 80) private String curso;
    @Column(nullable = false, length = 100) private String asignatura;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 2) private TipoNota tipo;
    @Column(nullable = false) private int posicion;                   // 1..maxPosicion del tipo
    @Column(nullable = false, precision = 2, scale = 1) private BigDecimal valor;   // 1.0 a 7.0
    @Column(name = "docente_id", nullable = false) private Long docenteId;
    @Column(nullable = false) private Instant actualizado = Instant.now();

    protected Nota() {}

    public Nota(Long estudianteId, String curso, String asignatura, TipoNota tipo, int posicion,
                BigDecimal valor, Long docenteId) {
        this.estudianteId = estudianteId; this.curso = curso; this.asignatura = asignatura;
        this.tipo = tipo; this.posicion = posicion; this.valor = valor; this.docenteId = docenteId;
    }

    public void actualizar(BigDecimal valor, Long docenteId) {
        this.valor = valor; this.docenteId = docenteId; this.actualizado = Instant.now();
    }

    public Long getId() { return id; }
    public Long getEstudianteId() { return estudianteId; }
    public String getCurso() { return curso; }
    public String getAsignatura() { return asignatura; }
    public TipoNota getTipo() { return tipo; }
    public int getPosicion() { return posicion; }
    public BigDecimal getValor() { return valor; }
}
