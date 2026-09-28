import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

function Asistencia() {

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        
                        <Navbar />
                        
                        <section className="col-md-10 py-5 px-4 px-md-5 fondo-panel">
                            
                            <div className="tarjeta-blanca p-4 p-md-5 mb-5 border rounded">
                                <h1 className="titulo-principal mb-0">Mi asistencia</h1>
                            </div>
                            
                            
                            <div className="row g-4 mb-5">
                                <div className="col-md-6 col-lg-3">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                        <i className="bx bx-percentage fs-1 icono-metrica-neutra mb-2"></i>
                                        <span className="d-block fs-3 fw-bold monto-valor">91%</span>
                                        <span className="etiqueta-valor small texto-secundario">Asistencia Global</span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                        <i className="bx bx-calendar-alt fs-1 icono-eventos mb-2"></i>
                                        <span className="d-block fs-3 fw-bold monto-valor">50</span>
                                        <span className="etiqueta-valor small texto-secundario">Total Clases</span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                        <i className="bx bx-check-circle fs-1 icono-metrica-ok mb-2"></i>
                                        <span className="d-block fs-3 fw-bold monto-valor">46</span>
                                        <span className="etiqueta-valor small texto-secundario">Asistencias</span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                        <i className="bx bx-x-circle fs-1 texto-peligro mb-2"></i>
                                        <span className="d-block fs-3 fw-bold texto-peligro">4</span>
                                        <span className="etiqueta-valor small texto-secundario">Inasistencias</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="mb-5">
                                <h2 className="subtitulo mb-4">Detalle de inasistencias</h2>
                                <div className="row g-4">
                                    <div className="col-md-6 col-lg-3">
                                        <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                                            <h3 className="fs-6 fw-bold mb-2">Lunes 24 de Agosto</h3>
                                            <p className="mb-0 small texto-peligro fw-semibold"><i className='bx bx-error-circle me-1'></i>Ausente</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                                            <h3 className="fs-6 fw-bold mb-2">Jueves 27 de Agosto</h3>
                                            <p className="mb-0 small texto-peligro fw-semibold"><i className='bx bx-error-circle me-1'></i>Ausente</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                                            <h3 className="fs-6 fw-bold mb-2">Martes 7 de Julio</h3>
                                            <p className="mb-0 small texto-peligro fw-semibold"><i className='bx bx-error-circle me-1'></i>Ausente</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3">
                                        <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                                            <h3 className="fs-6 fw-bold mb-2">Viernes 28 de Agosto</h3>
                                            <p className="mb-0 small texto-peligro fw-semibold"><i className='bx bx-error-circle me-1'></i>Ausente</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="tarjeta-blanca p-4 border rounded d-flex align-items-center">
                                <i className="bx bx-alert-triangle fs-2 icono-metrica-alerta me-3"></i>
                                <p className="mb-0 fs-5 fw-bold texto-destacado">Recuerda que la asistencia mínima exigida es del 70%.</p>
                            </div>
                            
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Asistencia;