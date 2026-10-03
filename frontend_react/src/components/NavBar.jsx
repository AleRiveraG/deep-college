import { Link, useLocation } from "react-router-dom"
 
const enlaces = [
  { ruta: '/docente', icono: 'bx-home', iconoClase: 'icono-inicio', texto: 'Inicio' },
  { ruta: '/docente/perfil', icono: 'bx-user-id-card', iconoClase: 'icono-perfil', texto: 'Mi perfil' },
  { ruta: '/docente/perfiles', icono: 'bx-user', iconoClase: 'icono-perfil', texto: 'Ver perfiles' },
  { ruta: '/docente/asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Registro de asistencia' },
  { ruta: '/docente/notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Registro de notas' },
  { ruta: '/docente/documentos', icono: 'bx-clipboard-detail', iconoClase: 'icono-gestion-academica', texto: 'Documentos' },
];
 
function NavBar() {
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
 
export default NavBar