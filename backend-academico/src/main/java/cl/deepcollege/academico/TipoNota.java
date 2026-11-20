package cl.deepcollege.academico;

/** Mismos códigos que ya usa el frontend: ES (2 notas), EF (2 notas), ED (3 notas). */
public enum TipoNota {
    ES(2), EF(2), ED(3);

    private final int maxPosicion;

    TipoNota(int maxPosicion) { this.maxPosicion = maxPosicion; }

    public int getMaxPosicion() { return maxPosicion; }
}
