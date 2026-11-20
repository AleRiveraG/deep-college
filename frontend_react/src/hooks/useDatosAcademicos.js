import { useEffect, useState } from 'react';
import { apiAcademico } from '../services/api';

// Devuelve notas, asistencia, horario con la MISMA forma que
// datosDemoAcademicos[id], esto es para no tocar lo demas del componente
export default function useDatosAcademicos(alumnoId, curso) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!alumnoId) {
      setDatos(null);
      setError('');
      return undefined;
    }

    let vigente = true;
    setCargando(true);
    setError('');
    setDatos(null);

    const base = `/api/academico/estudiantes/${alumnoId}`;
    const horario = curso
      ? apiAcademico(
          `/api/academico/cursos/${encodeURIComponent(curso)}/horario`
        )
      : Promise.resolve([]);

    Promise.all([
      apiAcademico(`${base}/notas`),
      apiAcademico(`${base}/asistencia`),
      horario,
    ])
      .then(([notas, asistencia, horarioCurso]) => {
        if (vigente) setDatos({ notas, asistencia, horario: horarioCurso });
      })
      .catch((e) => {
        if (vigente) {
          setError(e.message || 'No se pudieron cargar los datos académicos.');
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [alumnoId, curso]);

  return { datos, cargando, error };
}