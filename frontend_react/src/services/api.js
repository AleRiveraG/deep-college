const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const ACADEMICO_URL =
  import.meta.env.VITE_ACADEMICO_URL || 'http://localhost:8081';

async function pedir(base, path, options = {}) {
  const token = localStorage.getItem('deepcollege.token');

  const response = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = response.status === 204
    ? null
    : await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      data?.detail ||
      'No se pudo completar la solicitud'
    );
  }

  return data;
}

//llamas del backend de usuarios quedan tal cual
export function api(path, options) {
  return pedir(API_URL, path, options);
}

// backend academico
export function apiAcademico(path, options) {
  return pedir(ACADEMICO_URL, path, options);
}

export const rutaPorRol = {
  DIRECTIVA: '/directiva',
  DOCENTE: '/docente',
  ESTUDIANTE: '/estudiante',
  APODERADO: '/apoderado',
};