package cl.deepcollege.usuarios;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "postulaciones")
public class Postulacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nombresPostulante;

    @Column(nullable = false, length = 100)
    private String apellidosPostulante;

    @Column(nullable = false, length = 15)
    private String rutPostulante;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @Column(nullable = false, length = 80)
    private String curso;

    @Column(nullable = false, length = 100)
    private String nombresApoderado;

    @Column(nullable = false, length = 100)
    private String apellidosApoderado;

    @Column(nullable = false, length = 15)
    private String rutApoderado;

    @Column(nullable = false, length = 180)
    private String correoApoderado;

    @Column(nullable = false, length = 30)
    private String telefonoApoderado;

    @Column(length = 2000)
    private String observaciones;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoPostulacion estado = EstadoPostulacion.PENDIENTE;

    @Column(nullable = false)
    private LocalDateTime creadaEn = LocalDateTime.now();

    private LocalDateTime resueltaEn;
    private Long estudianteUsuarioId;
    private Long apoderadoUsuarioId;

    protected Postulacion() {}

    public Postulacion(CrearPostulacionRequest r) {
        nombresPostulante = r.nombresPostulante().trim();
        apellidosPostulante = r.apellidosPostulante().trim();
        rutPostulante = r.rutPostulante().trim();
        fechaNacimiento = r.fechaNacimiento();
        curso = r.curso().trim();
        nombresApoderado = r.nombresApoderado().trim();
        apellidosApoderado = r.apellidosApoderado().trim();
        rutApoderado = r.rutApoderado().trim();
        correoApoderado = r.correoApoderado().trim().toLowerCase();
        telefonoApoderado = r.telefonoApoderado().trim();
        observaciones = r.observaciones();
    }

    public Long getId() { return id; }
    public String getNombresPostulante() { return nombresPostulante; }
    public String getApellidosPostulante() { return apellidosPostulante; }
    public String getRutPostulante() { return rutPostulante; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public String getCurso() { return curso; }
    public String getNombresApoderado() { return nombresApoderado; }
    public String getApellidosApoderado() { return apellidosApoderado; }
    public String getRutApoderado() { return rutApoderado; }
    public String getCorreoApoderado() { return correoApoderado; }
    public String getTelefonoApoderado() { return telefonoApoderado; }
    public String getObservaciones() { return observaciones; }
    public EstadoPostulacion getEstado() { return estado; }
    public LocalDateTime getCreadaEn() { return creadaEn; }
    public Long getEstudianteUsuarioId() { return estudianteUsuarioId; }
    public Long getApoderadoUsuarioId() { return apoderadoUsuarioId; }

    public void resolver(EstadoPostulacion estado, Long estudianteId, Long apoderadoId) {
        this.estado = estado;
        this.estudianteUsuarioId = estudianteId;
        this.apoderadoUsuarioId = apoderadoId;
        this.resueltaEn = LocalDateTime.now();
    }
}