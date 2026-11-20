package cl.deepcollege.finanzas;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Locale;

public enum NivelEnsenanza {
    BASICA, MEDIA;

    @JsonValue
    public String valor() {
        return name().toLowerCase(Locale.ROOT);
    }

    @JsonCreator
    public static NivelEnsenanza desde(String valor) {
        if (valor == null) return null;
        return valueOf(valor.toUpperCase(Locale.ROOT));
    }
}
