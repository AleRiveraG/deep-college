package cl.deepcollege.usuarios;

import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UsuarioRepository usuarios; private final PasswordEncoder encoder; private final JwtService jwt;
    public AuthController(UsuarioRepository usuarios, PasswordEncoder encoder, JwtService jwt) { this.usuarios=usuarios; this.encoder=encoder; this.jwt=jwt; }
    public record LoginRequest(@NotBlank @Email String correo, @NotBlank String contrasena) {}
    @PostMapping("/login")
    public Map<String,Object> login(@jakarta.validation.Valid @RequestBody LoginRequest request) {
        Usuario user = usuarios.findByCorreoIgnoreCase(request.correo().trim()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas"));
        if (!user.isActivo() || !encoder.matches(request.contrasena(), user.getPasswordHash())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales inválidas");
        String token = jwt.crear(user);
        return Map.of("token", token, "accessToken", token, "tokenType", "Bearer", "expiresIn", jwt.expiracionSegundos(),
            "rol", user.getRol().name(), "usuario", UsuarioResponse.from(user));
    }
}
