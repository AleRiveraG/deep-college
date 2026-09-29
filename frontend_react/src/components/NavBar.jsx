import { Link, useLocation } from 'react-router-dom';
 
const enlaces = [
  { ruta: '/directiva', icono: 'bx-home-alt', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/directiva/ver-perfil', icono: 'bx-user', iconoClase: 'icono-perfil', texto: 'Ver perfil' },
  { ruta: '/directiva/gestion-academica', icono: 'bx-community', iconoClase: 'icono-gestion-academica', texto: 'Gestión académica' },
  { ruta: '/directiva/registro-notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Registro de notas' },
  { ruta: '/directiva/registro-asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Registro de asistencia' },
  { ruta: '/directiva/calculadora-sueldos', icono: 'bx-calculator', iconoClase: 'icono-sueldos', texto: 'Calculadora de sueldos' },
  { ruta: '/directiva/horarios', icono: 'bx-calendar-detail', iconoClase: 'icono-horarios', texto: 'Organizar horarios' },
];
 
function SidebarDirectiva() {
    //el useLocation es el encargado de saber donde estamos parados y va comprando 
  const location = useLocation();
 
  return (
    <aside className="col-md-2 sidebar min-vh-100">
      <nav className="list-group">
        {enlaces.map((enlace) => {
          const esActivo = location.pathname === enlace.ruta;
          return (
            <Link
              key={enlace.ruta}
              to={enlace.ruta}
              className={`list-group-item d-flex align-items-center py-3${esActivo ? ' active' : ''}`}
              style={esActivo ? { backgroundColor: '#283A94', borderColor: '#283A94' } : undefined}
            >
              <i className={`bx ${enlace.icono} fs-4 me-2 ${enlace.iconoClase}`}></i>
              {enlace.texto}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
 
export default SidebarDirectiva;