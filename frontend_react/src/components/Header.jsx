import { Link } from ReactRouter;

function Header() {

    return(
        <>
            <header>
                <div className="d-flex justify-content-between align-items-center py-3 px-4">
                    <div className="d-flex align-items-center">
                        <img src="/images/logo-deep-white.png" height="50" className="me-3" alt="Logo Colegio" />
                        <span className="badge rol-docente fs-6 ms-2">Estudiante</span>
                    </div>
                    <Link href="/">
                        <button id="btn-cerrar" className="btn btn-sm">Cerrar sesión</button>
                    </Link>
                </div>
            </header> 
        </>
    );
}

export default Header;