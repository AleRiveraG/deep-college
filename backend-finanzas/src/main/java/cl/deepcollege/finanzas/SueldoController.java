package cl.deepcollege.finanzas;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/finanzas")
public class SueldoController {

    private final SueldoService service;

    public SueldoController(SueldoService service) {
        this.service = service;
    }

    @GetMapping("/parametros")
    public ParametrosResponse parametros() {
        return service.parametros();
    }

    @PostMapping("/sueldos/calcular")
    public ResultadoCalculo calcular(@Valid @RequestBody CalculoRequest datos, Authentication auth) {
        return service.calcular(datos, Long.valueOf(auth.getName()));
    }
}
