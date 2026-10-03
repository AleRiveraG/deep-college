import { Link, useLocation } from 'react-router-dom';

export const enlacesDirectiva = [
  { ruta: '/directiva', icono: 'bx-home-alt', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/directiva/ver-perfil', icono: 'bx-user', iconoClase: 'icono-perfil', texto: 'Ver perfil' },
  { ruta: '/directiva/gestion-academica', icono: 'bx-community', iconoClase: 'icono-gestion-academica', texto: 'Gestión académica' },
  { ruta: '/directiva/registro-notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Registro de notas' },
  { ruta: '/directiva/registro-asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Registro de asistencia' },
  { ruta: '/directiva/calculadora-sueldos', icono: 'bx-calculator', iconoClase: 'icono-sueldos', texto: 'Calculadora de sueldos' },
  { ruta: '/directiva/horarios', icono: 'bx-calendar-detail', iconoClase: 'icono-horarios', texto: 'Organizar horarios' },
];

export const enlacesDocente = [
  { ruta: '/docente', icono: 'bx-home', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/docente/perfil', icono: 'bx-user-id-card', iconoClase: 'icono-perfil', texto: 'Mi perfil' },
  { ruta: '/docente/perfiles', icono: 'bx-user', iconoClase: 'icono-perfil', texto: 'Ver perfiles' },
  { ruta: '/docente/asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Registro de asistencia' },
  { ruta: '/docente/notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Registro de notas' },
  { ruta: '/docente/documentos', icono: 'bx-clipboard-detail', iconoClase: 'icono-gestion-academica', texto: 'Documentos' },
];

export const enlacesEstudiante = [
  { ruta: '/estudiante', icono: 'bx-home', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/estudiante/perfil', icono: 'bx-user-id-card', iconoClase: 'icono-perfil', texto: 'Mi perfil' },
  { ruta: '/estudiante/asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Asistencia' },
  { ruta: '/estudiante/notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Notas' },
  { ruta: '/estudiante/horario', icono: 'bx-calendar-alt', iconoClase: 'icono-horarios', texto: 'Horario' },
];

function NavBar({ rol, items }) {
  const location = useLocation();

  let enlaces = items;
  if (!enlaces) {
    if (rol === 'docente') {
      enlaces = enlacesDocente;
    } else if (rol === 'estudiante') {
      enlaces = enlacesEstudiante;
    } else if (rol === 'directiva') {
      enlaces = enlacesDirectiva;
    } else {
      const pathname = location?.pathname || '';
      if (pathname.startsWith('/docente')) {
        enlaces = enlacesDocente;
      } else if (pathname.startsWith('/estudiante')) {
        enlaces = enlacesEstudiante;
      } else {
        enlaces = enlacesDirectiva;
      }
    }
  }

  return (
    <aside className="col-md-2 sidebar min-vh-100" data-testid="sidebar-nav">
      <nav className="list-group" role="navigation">
        {enlaces.map((enlace) => {
          const esActivo = location?.pathname === enlace.ruta;
          return (
            <Link
              key={enlace.ruta}
              to={enlace.ruta}
              className={`list-group-item d-flex align-items-center py-3${esActivo ? ' active' : ''}`}
              style={esActivo ? { backgroundColor: '#283A94', borderColor: '#283A94' } : undefined}
            >
              <i className={`bx ${enlace.icono} fs-4 me-2 ${enlace.iconoClase}`}></i>
              <span>{enlace.texto}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export { NavBar as SidebarDirectiva };
export default NavBar;