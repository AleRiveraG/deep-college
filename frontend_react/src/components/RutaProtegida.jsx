import { Navigate, Outlet } from 'react-router-dom';

function RutaProtegida({ roles }) {
  const token = localStorage.getItem('deepcollege.token');
  const rol = localStorage.getItem('deepcollege.rol');
  if (!token) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(rol)) return <Navigate to={rol ? ({ DIRECTIVA: '/directiva', DOCENTE: '/docente', ESTUDIANTE: '/estudiante', APODERADO: '/apoderado' }[rol] || '/') : '/login'} replace />;
  return <Outlet />;
}

export default RutaProtegida;
