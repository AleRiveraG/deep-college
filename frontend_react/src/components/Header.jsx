import { Link, useLocation } from 'react-router-dom';

function Header({ rol, claseEtiqueta, onLogout, logoutPath = '/' }) {
  const location = useLocation();

  let rolFinal = rol;
  let claseFinal = claseEtiqueta;

  if (!rolFinal) {
    const ruta = location?.pathname || '';
    if (ruta.startsWith('/docente')) {
      rolFinal = 'Docente';
      claseFinal = 'rol-docente';
    } else if (ruta.startsWith('/estudiante')) {
      rolFinal = 'Estudiante';
      claseFinal = 'rol-estudiante';
    } else if (ruta.startsWith('/directiva')) {
      rolFinal = 'Directiva';
      claseFinal = 'etiqueta-directiva';
    } else {
      rolFinal = 'Colegio';
      claseFinal = 'etiqueta-directiva';
    }
  }

  return (
    <header>
      <div className="d-flex justify-content-between align-items-center py-3 px-4">
        <div className="d-flex align-items-center">
          <img src="/images/logo-deep-white.png" height="50" className="me-3" alt="Logo Colegio" />
          <span className={`badge ${claseFinal || ''} fs-6 ms-2`} data-testid="rol-badge">
            {rolFinal}
          </span>
        </div>
        <Link to={logoutPath}>
          <button id="btn-cerrar" className="btn btn-sm" onClick={onLogout} data-testid="btn-cerrar-sesion">
            Cerrar sesión
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;