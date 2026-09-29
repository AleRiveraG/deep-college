import { Link, useLocation } from "react-router-dom"
 
const enlaces = [
  { ruta: '/estudiante', icono: 'bx-home', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/estudiante/perfil', icono: 'bx-user-id-card', iconoClase: 'icono-perfil', texto: 'Mi perfil' },
  { ruta: '/estudiante/asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Asistencia' },
  { ruta: '/estudiante/notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Notas' },
  { ruta: '/estudiante/horario', icono: 'bx-calendar-alt', iconoClase: 'icono-horarios', texto: 'Horario' },
];
 
function Navbar() {
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
              style={esActivo ? { backgroundColor: "#283A94", borderColor: "#283A94" } : undefined}
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
 
export default Navbar;