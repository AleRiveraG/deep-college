import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

function PaginaPrincipal() {

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <Navbar />
                        <section className="col-md-10 py-5 px-4 px-md-5 fondo-panel">
                            <div className="row align-items-center mb-4">
                                <h1 id="nombre" className="titulo-principal mb-2 col-md-6">Bienvenido/a </h1>
                                <h2 id="fecha" className="fs-6 texto-secundario mb-4 col-md-6 text-end"></h2>
                            </div>
                            
                            <div className="tarjeta-blanca p-4 p-md-5 mb-5 border rounded text-center">
                                
                                <p className="fs-4 fw-bold texto-destacado mb-0">¿Qué deseas hacer el día de hoy?</p>
                            </div>
                            
                            <div className="row g-4 mb-5">
                                <div className="col-md-6">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex align-items-center">
                                        <i className="bx bx-chart-line fs-1 icono-metrica-neutra me-4"></i>
                                        <div className="text-start">
                                            <span className="d-block fs-3 fw-bold monto-valor">6.2</span>
                                            <span className="etiqueta-valor small">Promedio General</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex align-items-center">
                                        <i className="bx bx-user-check fs-1 icono-metrica-ok me-4"></i>
                                        <div className="text-start">
                                            <span className="d-block fs-3 fw-bold icono-metrica-ok">98%</span>
                                            <span className="etiqueta-valor small">Asistencia General</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex align-items-center">
                                        <i className="bx bx-clock-dashed-half fs-1 icono-metrica-alerta me-4"></i>
                                        <div className="text-start">
                                            <span className="d-block fs-4 fw-bold texto-destacado">Estadistica</span>
                                            <span className="etiqueta-valor small">Proxima Clase</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex align-items-center">
                                        <i className="bx bx-bell fs-1 icono-metrica-info me-4"></i>
                                        <div className="text-start">
                                            <span className="d-block fs-3 fw-bold monto-valor">3</span>
                                            <span className="etiqueta-valor small">Avisos sin leer</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="eventos-contenedor">
                                <h3 className="mb-4 border-bottom pb-2">
                                    <i className="bx bx-calendar-event me-2 icono-eventos"></i> Próximos eventos
                                </h3>
                                <div className="row g-4">
                                    <div className="col-md-4">
                                        <div className="p-4 border rounded tarjeta-blanca caja-valor h-100">
                                            <h4 className="fs-6 fw-bold mb-2">Miercoles 2 de Septiembre</h4>
                                            <p className="mb-0 small texto-secundario">Reunión de Apoderados, 18:30 hrs.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4 rounded tarjeta-blanca caja-valor h-100 borde-peligro">
                                            <h4 className="fs-6 fw-bold mb-2 texto-peligro">Viernes 4 de Septiembre</h4>
                                            <p className="mb-0 small texto-peligro fw-semibold"><i className='bx bx-error-circle me-1'></i>Prueba de Estadistica</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4 border rounded tarjeta-blanca caja-valor h-100">
                                            <h4 className="fs-6 fw-bold mb-2">Jueves 17 de Septiembre</h4>
                                            <p className="mb-0 small texto-secundario">Suspensión de clases</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PaginaPrincipal;