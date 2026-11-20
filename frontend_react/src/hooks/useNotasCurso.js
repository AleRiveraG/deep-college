import { useCallback, useEffect, useState } from 'react';
import { apiAcademico } from '../services/api';

// Casillas de la tabla de notas tipo, posición que guarda el backend.
const casillas = [
  ['es1', 'ES', 1],
  ['es2', 'ES', 2],
  ['ef1', 'EF', 1],
  ['ef2', 'EF', 2],
  ['ed1', 'ED', 1],
  ['ed2', 'ED', 2],
  ['ed3', 'ED', 3],
];

function aNumero(valor) {
  if (valor === '' || valor === null || valor === undefined) return null;

  const numero = Number(String(valor).replace(',', '.'));

  if (!Number.isFinite(numero)) {
    throw new Error(`"${valor}" no es una nota válida.`);
  }

  return numero;
}

export default function useNotasCurso(curso, asignaturaElegida) {
  const [asignaturas, setAsignaturas] = useState([]);
  const [notasPorAlumno, setNotasPorAlumno] = useState({});
  const [errorNotas, setErrorNotas] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [version, setVersion] = useState(0);

  const asignaturaActiva = asignaturas.includes(asignaturaElegida)
    ? asignaturaElegida
    : asignaturas[0] || '';

  useEffect(() => {
    setAsignaturas([]);
    setErrorNotas('');
    if (!curso) return undefined;

    let vigente = true;

    apiAcademico(`/api/academico/cursos/${encodeURIComponent(curso)}/asignaturas`)
      .then((lista) => {
        if (vigente) setAsignaturas(Array.isArray(lista) ? lista : []);
      })
      .catch((e) => {
        if (vigente) setErrorNotas(e.message || 'No se pudieron cargar las asignaturas.');
      });

    return () => {
      vigente = false;
    };
  }, [curso]);

  useEffect(() => {
    setNotasPorAlumno({});
    if (!curso || !asignaturaActiva) return undefined;

    let vigente = true;
    const parametros = new URLSearchParams({ asignatura: asignaturaActiva });

    apiAcademico(
      `/api/academico/cursos/${encodeURIComponent(curso)}/notas?${parametros}`
    )
      .then((lista) => {
        if (!vigente) return;

        // misma forma que el demo
        const mapa = {};
        lista.forEach((n) => {
          mapa[n.estudianteId] ??= { ES: [], EF: [], ED: [] };
          mapa[n.estudianteId][n.tipo][n.posicion - 1] = n.valor;
        });
        setNotasPorAlumno(mapa);
      })
      .catch((e) => {
        if (vigente) setErrorNotas(e.message || 'No se pudieron cargar las notas.');
      });

    return () => {
      vigente = false;
    };
  }, [curso, asignaturaActiva, version]);

  // filas del alumno las notas
  const guardar = useCallback(
    async (filas) => {
      setGuardando(true);

      try {
        const notas = filas.flatMap(({ alumnoId, valores }) =>
          casillas.map(([campo, tipo, posicion]) => ({
            estudianteId: alumnoId,
            tipo,
            posicion,
            valor: aNumero(valores[campo]),
          }))
        );

        await apiAcademico(
          `/api/academico/cursos/${encodeURIComponent(curso)}/notas`,
          {
            method: 'PUT',
            body: JSON.stringify({ asignatura: asignaturaActiva, notas }),
          }
        );

        setVersion((v) => v + 1);
      } finally {
        setGuardando(false);
      }
    },
    [curso, asignaturaActiva]
  );

  return {
    asignaturas,
    asignaturaActiva,
    notasPorAlumno,
    errorNotas,
    guardando,
    guardar,
  };
}