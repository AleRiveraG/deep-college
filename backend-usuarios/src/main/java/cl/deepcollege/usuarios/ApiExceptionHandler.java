package cl.deepcollege.usuarios;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> invalid(MethodArgumentNotValidException e) {
        var errors = e.getBindingResult().getFieldErrors().stream().collect(java.util.stream.Collectors.toMap(
            f -> f.getField(), f -> f.getDefaultMessage(), (a,b) -> a));
        return ResponseEntity.badRequest().body(Map.of("error", "Solicitud inválida", "campos", errors));
    }
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<?> badRequest(IllegalArgumentException e) { return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
    @ExceptionHandler(DataIntegrityViolationException.class)
    ResponseEntity<?> conflict(DataIntegrityViolationException e) { return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "El correo o RUT ya está registrado")); }
}
