package cl.deepcollege.academico;

import jakarta.persistence.*;

@Entity
@Table(schema = "academico", name = "bloques_horario",
    uniqueConstraints = @UniqueConstraint(name = "uk_bloque_curso_dia_modulo", columnNames = {"curso", "dia", "modulo"}))
public class BloqueHorario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 80) private String curso;
    @Column(nullable = false) private int dia;                       // 1 = lunes ... 5 = viernes
    @Column(nullable = false, length = 11) private String modulo;    // "08:00-08:45"
    @Column(nullable = false, length = 100) private String asignatura;

    protected BloqueHorario() {}

    public BloqueHorario(String curso, int dia, String modulo, String asignatura) {
        this.curso = curso; this.dia = dia; this.modulo = modulo; this.asignatura = asignatura;
    }

    public Long getId() { return id; }
    public String getCurso() { return curso; }
    public int getDia() { return dia; }
    public String getModulo() { return modulo; }
    public String getAsignatura() { return asignatura; }
}
