package cl.deepcollege.finanzas;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

/** Solo VALIDA tokens. Los tokens los emite backend-usuarios con el mismo JWT_SECRET. */
@Service
public class JwtService {
    private final SecretKey key;

    public JwtService(@Value("${app.jwt.secret}") String secret) {
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("Configura JWT_SECRET (el mismo que usa backend-usuarios)");
        }
        try {
            this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        } catch (RuntimeException ex) {
            throw new IllegalStateException("JWT_SECRET debe ser Base64 y representar al menos 32 bytes", ex);
        }
    }

    public Claims validarYLeer(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
