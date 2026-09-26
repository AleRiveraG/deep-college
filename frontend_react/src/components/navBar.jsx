import { Link } from "react-router-dom"

function NavBar() {
    return (
        <aside className="col-md-2 sidebar min-vh-100">
            <nav className="list-group">
                <Link to= "/docente" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-home fs-4 me-2 icono-inicio"></i>
                    Inicio
                </Link>
                <Link to="/docente/perfil" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-user-id-card fs-4 me-2 icono-perfil"></i>
                    Mi perfil
                </Link>
                <Link to="/docente/perfiles" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-user fs-4 me-2 icono-perfil"></i>
                    Ver perfiles
                </Link>
                <Link to="/docente/asistencia" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-clipboard-check fs-4 me-2 icono-asistencia"></i>
                    Registro de asistencia
                </Link>
                <Link to="/docente/notas" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-education fs-4 me-2 icono-notas"></i>
                    Registro de notas
                </Link>
                <Link to="/docente/documentos" className="list-group-item d-flex align-items-center py-3">
                    <i className="bx bx-clipboard-detail fs-4 me-2 icono-gestion-academica"></i>
                    Documentos
                </Link>
            </nav>
        </aside>

    );
}

export default NavBar