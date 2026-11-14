package cl.deepcollege.usuarios;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey key;
    private final long expiration;
    public JwtService(@Value("${app.jwt.secret}") String secret, @Value("${app.jwt.expiration}") long expiration) {
        if (secret == null || secret.isBlank()) throw new IllegalStateException("Configura JWT_SECRET con una clave Base64 segura de al menos 32 bytes");
        try { this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)); }
        catch (RuntimeException ex) { throw new IllegalStateException("JWT_SECRET debe ser Base64 y representar al menos 32 bytes", ex); }
        this.expiration = expiration;
    }
    public String crear(Usuario usuario) {
        var now = new Date();
        return Jwts.builder().subject(usuario.getId().toString()).claim("rol", usuario.getRol().name())
            .claim("correo", usuario.getCorreo()).issuedAt(now).expiration(new Date(now.getTime() + expiration))
            .signWith(key).compact();
    }
    public long expiracionSegundos() { return expiration / 1000; }
    public io.jsonwebtoken.Claims validarYLeer(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
