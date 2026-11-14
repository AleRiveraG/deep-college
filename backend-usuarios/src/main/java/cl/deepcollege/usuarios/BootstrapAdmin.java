package cl.deepcollege.usuarios;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BootstrapAdmin {
    @Bean CommandLineRunner bootstrapDirectiva(UsuarioRepository users, PasswordEncoder encoder,
            @Value("${app.bootstrap.admin-email}") String email, @Value("${app.bootstrap.admin-password}") String password) {
        return args -> {
            if (email == null || email.isBlank() || password == null || password.isBlank()) return;
            if (password.length() < 8) throw new IllegalStateException("BOOTSTRAP_ADMIN_PASSWORD debe tener al menos 8 caracteres");
            if (!email.toLowerCase().matches("^[^@]+@directiva\\.deepcollege\\.cl$")) throw new IllegalStateException("BOOTSTRAP_ADMIN_EMAIL debe usar @directiva.deepcollege.cl");
            if (users.existsByCorreoIgnoreCase(email)) return;
            if (users.existsByRutIgnoreCase("00.000.000-0")) throw new IllegalStateException("No se puede crear la cuenta inicial: RUT de bootstrap ya utilizado");
            users.save(new Usuario(email.trim().toLowerCase(), encoder.encode(password), Rol.DIRECTIVA, "00.000.000-0", "Administración", "Deep College", null, null, null, null, null));
        };
    }
}
