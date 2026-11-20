package cl.deepcollege.academico;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(schema = "academico", name = "asistencias",
    uniqueConstraints = @UniqueConstraint(name = "uk_asistencia_estudiante_fecha", columnNames = {"estudiante_id", "fecha"}))
public class Asistencia {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "estudiante_id", nullable = false) private Long estudianteId;
    @Column(nullable = false, length = 80) private String curso;
    @Column(nullable = false) private LocalDate fecha;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 10) private EstadoAsistencia estado;
    @Column(name = "docente_id", nullable = false) private Long docenteId;

    protected Asistencia() {}

    public Asistencia(Long estudianteId, String curso, LocalDate fecha, EstadoAsistencia estado, Long docenteId) {
        this.estudianteId = estudianteId; this.curso = curso; this.fecha = fecha;
        this.estado = estado; this.docenteId = docenteId;
    }

    public void actualizar(String curso, EstadoAsistencia estado, Long docenteId) {
        this.curso = curso; this.estado = estado; this.docenteId = docenteId;
    }

    public Long getEstudianteId() { return estudianteId; }
    public LocalDate getFecha() { return fecha; }
    public EstadoAsistencia getEstado() { return estado; }
}
