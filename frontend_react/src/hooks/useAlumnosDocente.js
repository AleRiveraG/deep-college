import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const cursosDisponibles = [
  { valor: '1-basico', nombre: '1° Básico' },
  { valor: '2-basico', nombre: '2° Básico' },
  { valor: '3-basico', nombre: '3° Básico' },
  { valor: '4-basico', nombre: '4° Básico' },
  { valor: '5-basico', nombre: '5° Básico' },
  { valor: '6-basico', nombre: '6° Básico' },
  { valor: '7-basico', nombre: '7° Básico' },
  { valor: '8-basico', nombre: '8° Básico' },
  { valor: '1-medio', nombre: '1° Medio' },
  { valor: '2-medio', nombre: '2° Medio' },
  { valor: '3-medio', nombre: '3° Medio' },
  { valor: '4-medio', nombre: '4° Medio' },
];

function normalizar(texto = '') {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase();
}

function filtrarCursos(nivel) {
  const valor = normalizar(nivel);

  if (valor.includes('todo') || valor.includes('ambos')) {
    return cursosDisponibles;
  }

  if (valor.includes('basica') || valor.includes('basico')) {
    return cursosDisponibles.filter((curso) =>
      curso.valor.endsWith('-basico')
    );
  }

  if (valor.includes('media') || valor.includes('medio')) {
    return cursosDisponibles.filter((curso) =>
      curso.valor.endsWith('-medio')
    );
  }

  return [];
}

export default function useAlumnosDocente() {
  const [nivel, setNivel] = useState('');
  const [curso, setCurso] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [cargandoPerfil, setCargandoPerfil] = useState(true);
  const [cargandoAlumnos, setCargandoAlumnos] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let vigente = true;

    api('/api/usuarios/me')
      .then((perfil) => {
        if (!vigente) return;

        if (perfil.rol !== 'DOCENTE') {
          throw new Error('La cuenta conectada no corresponde a un docente.');
        }

        setNivel(perfil.nivel || '');
      })
      .catch((e) => {
        if (vigente) setError(e.message || 'No se pudo cargar el perfil docente.');
      })
      .finally(() => {
        if (vigente) setCargandoPerfil(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  const cursos = filtrarCursos(nivel);

  async function seleccionarCurso(valor) {
    setCurso(valor);
    setAlumnos([]);
    setError('');

    if (!valor) return;

    setCargandoAlumnos(true);

    try {
      const parametros = new URLSearchParams({
        rol: 'ESTUDIANTE',
        curso: valor,
      });

      const resultado = await api(`/api/usuarios?${parametros.toString()}`);
      setAlumnos(resultado);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los estudiantes del curso.');
    } finally {
      setCargandoAlumnos(false);
    }
  }

  return {
    nivel,
    cursos,
    curso,
    alumnos,
    error,
    cargando: cargandoPerfil || cargandoAlumnos,
    seleccionarCurso,
  };
}