package cl.deepcollege.academico;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriBuilder;

import java.net.URI;
import java.util.List;
import java.util.function.Function;

/**
 * Habla con backend-usuarios usando el MISMO token del request.
 * Así backend-usuarios sigue siendo el único dueño de la tabla "usuarios" y de sus reglas
 * (por ejemplo: qué cursos puede ver un docente según su nivel).
 */
@Component
public class UsuariosClient {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record UsuarioDto(Long id, String rol, String curso, String nivel) {}

    private final RestClient http;

    public UsuariosClient(RestClient.Builder builder, @Value("${app.usuarios.base-url}") String baseUrl) {
        this.http = builder.baseUrl(baseUrl).build();
    }

    /** GET /api/usuarios/me */
    public UsuarioDto perfil(String bearer) {
        return get(b -> b.path("/api/usuarios/me").build(), bearer, new ParameterizedTypeReference<UsuarioDto>() {});
    }

    /** GET /api/apoderados/me/pupilos (solo APODERADO) */
    public List<UsuarioDto> pupilos(String bearer) {
        List<UsuarioDto> r = get(b -> b.path("/api/apoderados/me/pupilos").build(), bearer,
            new ParameterizedTypeReference<List<UsuarioDto>>() {});
        return r == null ? List.of() : r;
    }

    /** GET /api/usuarios?rol=ESTUDIANTE&curso=... (DOCENTE: backend-usuarios valida su nivel y responde 403 si no corresponde) */
    public List<UsuarioDto> estudiantesDeCurso(String bearer, String curso) {
        List<UsuarioDto> r = get(
            b -> b.path("/api/usuarios").queryParam("rol", "ESTUDIANTE").queryParam("curso", curso).build(),
            bearer, new ParameterizedTypeReference<List<UsuarioDto>>() {});
        return r == null ? List.of() : r;
    }

    private <T> T get(Function<UriBuilder, URI> uri, String bearer, ParameterizedTypeReference<T> tipo) {
        try {
            return http.get().uri(uri).header(HttpHeaders.AUTHORIZATION, bearer).retrieve().body(tipo);
        } catch (HttpStatusCodeException e) {
            HttpStatusCode s = e.getStatusCode();
            HttpStatusCode salida = s.is5xxServerError() ? HttpStatus.BAD_GATEWAY : s;
            String msg = switch (s.value()) {
                case 401 -> "Sesión inválida o expirada";
                case 403 -> "No tienes permiso para consultar ese curso o estudiante";
                case 404 -> "No se encontró el usuario";
                default -> "Error al consultar el servicio de usuarios";
            };
            throw new ResponseStatusException(salida, msg);
        } catch (ResourceAccessException e) {
            throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, "El servicio de usuarios no responde");
        }
    }
}
