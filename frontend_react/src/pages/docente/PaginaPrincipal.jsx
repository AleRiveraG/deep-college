import Footer from "../../components/footer";
import Header from "../../components/header";
import NavBar from "../../components/navBar";


function PaginaPrincipalDocente() {
    return(
        <>  
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <NavBar />
                        <section className="col-md-10 py-5 px-4 px-md-5 fondo-panel">
                            <div className="row align-items-center mb-4">
                                <h1 id="nombre" className="titulo-principal mb-2 col-md-6">Bienvenido/a </h1>
                                <h2 id="fecha" className="fs-6 texto-secundario mb-4 col-md-6 text-end"></h2>
                            </div>

                            <div className="tarjeta-blanca p-4 p-md-5 mb-5 border rounded text-center">
                                <p className="fs-4 fw-bold texto-destacado mb-0">¿Qué deseas hacer el día de hoy?</p>
                            </div>
                            
                            <div className="eventos-contenedor">
                                <h3 className="mb-4">
                                    <i className="bx bx-calendar-event me-2 icono-eventos"></i> Próximos eventos
                                </h3>
                                
                                <div className="p-4 mb-3 caja-valor border rounded tarjeta-blanca">
                                    <h4 className="fs-5 fw-bold monto-resultado">Viernes 28 de Agosto</h4>
                                    <p className="mb-0">Reunion general de todo el personal</p>
                                </div>
                                
                                <div className="p-4 mb-3 caja-valor border rounded tarjeta-blanca">
                                    <h4 className="fs-5 fw-bold monto-resultado">Lunes 31 de Agosto</h4>
                                    <p className="mb-0">Prueba 2° Medio Estadistica</p>
                                </div>
                                
                                <div className="p-4 mb-3 caja-valor border rounded tarjeta-blanca">
                                    <h4 className="fs-5 fw-bold monto-resultado">Miércoles 2 de Septiembre</h4>
                                    <p className="mb-0">Entrega 4° Medio FullStack II</p>
                                </div>
                                
                                <div className="p-4 mb-3 caja-valor border rounded tarjeta-blanca">
                                    <h4 className="fs-5 fw-bold monto-resultado">Viernes 18 de Septiembre</h4>
                                    <p className="mb-0">Fiestas Patrias</p>
                                </div>
                            </div>
                            
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
            
        </>
    
    )
}

export default PaginaPrincipalDocente