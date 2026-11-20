package cl.deepcollege.finanzas;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {
    @GetMapping("/api/finanzas/health")
    public Map<String, String> health() {
        return Map.of("status", "UP", "servicio", "finanzas");
    }
}
