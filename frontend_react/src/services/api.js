const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function api(path, options = {}) {
  const token = localStorage.getItem('deepcollege.token');

  const response = await fetch(`${API_URL}${path}`, {
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

export const rutaPorRol = {
  DIRECTIVA: '/directiva',
  DOCENTE: '/docente',
  ESTUDIANTE: '/estudiante',
  APODERADO: '/apoderado',
};
