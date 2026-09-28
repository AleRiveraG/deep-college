import { Link } from "react-router-dom"

function Navbar() {
    
    return(
        <>
            <aside className="col-md-2 sidebar min-vh-100">
                <nav className="list-group">
                    <Link to="/estudiante" className="list-group-item d-flex align-items-center py-3 active" style={{backgroundColor: "#283A94", borderColor: "#283A94"}}>
                        <i className="bx bx-home fs-4 me-2 icono-inicio"></i>
                            Inicio
                    </Link>
                    <Link to="/estudiante/perfil" className="list-group-item d-flex align-items-center py-3">
                        <i className="bx bx-user-id-card fs-4 me-2 icono-perfil"></i>
                            Mi perfil
                    </Link>
                    <Link to="/estudiante/asistencia" className="list-group-item d-flex align-items-center py-3">
                        <i className="bx bx-clipboard-check fs-4 me-2 icono-asistencia"></i>
                            Asistencia
                    </Link>
                    <Link to="/estudiante/notas" className="list-group-item d-flex align-items-center py-3">
                        <i className="bx bx-education fs-4 me-2 icono-notas"></i>
                            Notas
                    </Link>
                    <Link to="/estudiante/horario" className="list-group-item d-flex align-items-center py-3">
                        <i className="bx bx-calendar-alt fs-4 me-2 icono-horarios"></i>
                            Horario
                    </Link>
                </nav>
            </aside>
        </>
    );
}

export default Navbar;