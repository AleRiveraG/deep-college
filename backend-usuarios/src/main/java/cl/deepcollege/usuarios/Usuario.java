package cl.deepcollege.usuarios;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "usuarios", uniqueConstraints = {
    @UniqueConstraint(name = "uk_usuarios_correo", columnNames = "correo"),
    @UniqueConstraint(name = "uk_usuarios_rut", columnNames = "rut")
})
public class Usuario {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 180) private String correo;
    @Column(name = "password_hash", nullable = false) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private Rol rol;
    @Column(nullable = false, length = 15) private String rut;
    @Column(nullable = false, length = 100) private String nombres;
    @Column(nullable = false, length = 100) private String apellidos;
    @Column(length = 30) private String telefono;
    private LocalDate fechaNacimiento;
    @Column(length = 80) private String curso;
    @Column(length = 80) private String nivel;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "apoderado_id") private Usuario apoderado;
    @Column(nullable = false) private boolean activo = true;

    protected Usuario() {}
    public Usuario(String correo, String passwordHash, Rol rol, String rut, String nombres, String apellidos,
                   String telefono, LocalDate fechaNacimiento, String curso, String nivel, Usuario apoderado) {
        this.correo = correo; this.passwordHash = passwordHash; this.rol = rol; this.rut = rut;
        this.nombres = nombres; this.apellidos = apellidos; this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento; this.curso = curso; this.nivel = nivel; this.apoderado = apoderado;
    }
    public Long getId() { return id; }
    public String getCorreo() { return correo; }
    public String getPasswordHash() { return passwordHash; }
    public Rol getRol() { return rol; }
    public String getRut() { return rut; }
    public String getNombres() { return nombres; }
    public String getApellidos() { return apellidos; }
    public String getTelefono() { return telefono; }
    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public String getCurso() { return curso; }
    public String getNivel() { return nivel; }
    public Usuario getApoderado() { return apoderado; }
    public boolean isActivo() { return activo; }
    public void darDeBaja() { this.activo = false; }
    public void reactivar(String nuevoPasswordHash) { this.activo = true; this.passwordHash = nuevoPasswordHash; }
    public void actualizar(PerfilRequest p) {
        nombres = p.nombres().trim(); apellidos = p.apellidos().trim(); rut = p.rut().trim();
        telefono = p.telefono(); fechaNacimiento = p.fechaNacimiento();
        if (rol == Rol.DOCENTE) nivel = p.nivel();
        if (rol == Rol.ESTUDIANTE) curso = p.curso();
    }
}
