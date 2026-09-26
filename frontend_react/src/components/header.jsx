import { Link } from "react-router-dom";

function Header() {

    return(
        <header>
            <div className="d-flex justify-content-between align-items-center py-3 px-4">
                <div className="d-flex align-items-center">
                    <img src="images/logo-deep-white.png" height="50" className="me-3" alt="Logo Colegio"/>
                    <span className="badge rol-docente fs-6">Docente</span>
                </div>
                <Link to="/docente">
                    <button id="btn-cerrar" className="btn btn-sm">Cerrar Sesión</button>
                </Link>
            </div>
        </header>
    );
}

export default Header;