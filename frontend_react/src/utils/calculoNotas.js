export const PONDERACIONES = {
  ES: 0.35, // Sumativa
  EF: 0.35, // Formativa
  ED: 0.3, // Desempeño
};

export const ETIQUETAS_EVALUACION = {
  ES: 'Sumativa',
  EF: 'Formativa',
  ED: 'Desempeño',
};

// Porcentaje entero para mostrar en pantalla: porcentaje('ES') 35
export function porcentaje(tipo) {
  return Math.round(PONDERACIONES[tipo] * 100);
}

function aNumero(valor) {
  if (valor === '' || valor === null || valor === undefined) return null;

  const numero = Number(valor);

  return Number.isFinite(numero) ? numero : null;
}

// Promedio simple ignorando casillas vacías. Devuelve null si no hay notas.
export function promedioSimple(valores = []) {
  const numeros = valores.map(aNumero).filter((n) => n !== null);

  if (numeros.length === 0) return null;

  return numeros.reduce((total, n) => total + n, 0) / numeros.length;
}

// notas = ES, EF, ED
//promedio de cada tipo cada promedio de los alumnos se multiplica por la ponderacion que tiene,
//  si el tipo aun no tiene notas se calcula con los tipos que si tienen, devuelve un null si no tiene nada.
export function promedioPonderado(notas) {
  let suma = 0;
  let pesos = 0;

  Object.entries(PONDERACIONES).forEach(([tipo, peso]) => {
    const promedioTipo = promedioSimple(notas?.[tipo] ?? []);

    if (promedioTipo !== null) {
      suma += promedioTipo * peso;
      pesos += peso;
    }
  });

  return pesos === 0 ? null : suma / pesos;
}

// Redondeo a un decimal, igual en todas las pantallas.
export function formatearPromedio(valor) {
  if (valor === null || valor === undefined) return '—';

  return (Math.round(valor * 10 + 1e-9) / 10).toFixed(1);
}