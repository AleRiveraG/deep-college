package cl.deepcollege.finanzas;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.TreeMap;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<?> invalid(MethodArgumentNotValidException e) {
        var errors = new TreeMap<String, String>();
        e.getBindingResult().getFieldErrors()
            .forEach(f -> errors.putIfAbsent(f.getField(), String.valueOf(f.getDefaultMessage())));
        return ResponseEntity.badRequest().body(Map.of("error", "Revisa los campos enviados", "campos", errors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<?> malformed(Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error",
            "Formato inválido: envía JSON con horas y años enteros; nivel debe ser basica o media"));
    }

    @ExceptionHandler({ConstraintViolationException.class, IllegalArgumentException.class})
    ResponseEntity<?> badRequest(Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", "Parámetros fuera del rango permitido"));
    }

    @ExceptionHandler(ResponseStatusException.class)
    ResponseEntity<?> status(ResponseStatusException e) {
        String msg = e.getReason() == null ? "No se pudo completar la solicitud" : e.getReason();
        return ResponseEntity.status(e.getStatusCode()).body(Map.of("error", msg));
    }
}
