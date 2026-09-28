import { Link } from "react-router-dom"

function Navbar() {
    
    return(
        <>
            <aside class="col-md-2 sidebar min-vh-100">
                <nav class="list-group">
                    <Link to="/estudiante" class="list-group-item d-flex align-items-center py-3 active" style="background-color: #283A94; border-color: #283A94;">
                        <i class="bx bx-home fs-4 me-2 icono-inicio"></i>
                            Inicio
                    </Link>
                    <Link to="/estudiante/perfil" class="list-group-item d-flex align-items-center py-3">
                        <i class="bx bx-user-id-card fs-4 me-2 icono-perfil"></i>
                            Mi perfil
                    </Link>
                    <Link to="estudiante/asistencia" class="list-group-item d-flex align-items-center py-3">
                        <i class="bx bx-clipboard-check fs-4 me-2 icono-asistencia"></i>
                            Asistencia
                    </Link>
                    <Link to="/estudiante/notas" class="list-group-item d-flex align-items-center py-3">
                        <i class="bx bx-education fs-4 me-2 icono-notas"></i>
                            Notas
                    </Link>
                    <Link to="/estudiante/horario" class="list-group-item d-flex align-items-center py-3">
                        <i class="bx bx-calendar-alt fs-4 me-2 icono-horarios"></i>
                            Horario
                    </Link>
                </nav>
            </aside>
        </>
    );
}

export default Navbar;