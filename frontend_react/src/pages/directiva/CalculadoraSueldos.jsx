import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SidebarDirectiva from "../../components/SidebarDirectiva";
function CalculadoraSueldos() {

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">

                        <SidebarDirectiva />

                        <section className="col-md-10 py-4 px-4 seccion-calculadora">
                            <h1 className="mb-4">Calculadora de sueldos</h1>
                            <h2 className="fs-6 mb-4">Calcula y consulta los sueldos de los trabajadores.</h2>
                            
                            <div className="mb-5 mt-4 seccion-valores-nacionales text-center">
                                <h2 className="fs-4 mb-4">Valores nacionales</h2>
                                <div className="row text-center mt-3 contenedor-valores g-4">
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Sueldo Mínimo</span>
                                            <strong className="monto-valor fs-4">$553.553</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Valor Hora Educación Media</span>
                                            <strong className="monto-valor hora-media fs-4">$21.034</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-3 border caja-valor h-100">
                                            <span className="d-block mb-1 etiqueta-valor small">Valor Hora Educación Básica</span>
                                            <strong className="monto-valor fs-4">$19.992</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="contenedor-formulario">
                                <form className="formulario-calculadora">
                                    <div className="row mb-4 fila-inputs">
                                        <div className="col-md-4">
                                            <label htmlFor="horas-semanales" className="form-label fw-bold small">Horas semanales</label>
                                            <input id="horas-semanales" type="number" className="form-control form-control-sm campo-formulario" min="0" max="42" /> 
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="anios-antiguedad" className="form-label fw-bold small">Años de antiguedad</label>
                                            <input id="anios-antiguedad" type="number" className="form-control form-control-sm campo-formulario" min="0" max="50" />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="nivel" className="form-label fw-bold small">Nivel de enseñanza:</label>
                                            <select id="nivel" className="form-select form-select-sm campo-formulario">
                                                <option value="basica">Educación Básica</option>
                                                <option value="media">Educación Media</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-sm boton-calcular px-4">Calcular</button>
                                    
                                    <hr className="my-5" style={{ borderColor: "#283A94;" }} />
                                    
                                    <div className="row contenedor-resultados">
                                        <div className="col-md-6 px-4 columna-resultados columna-haberes border-end">
                                            <h3 className="fs-5 mb-4">Haberes</h3>
                                            <div className="mt-3 detalle-resultados">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Pago por horas</span>
                                                    <span id="pago-horas" className="fw-bold monto-resultado">$</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Bono años de antiguedad</span>
                                                    <span id="bono-antiguedad" className="fw-bold monto-resultado">$</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between fs-5">
                                                    <strong className="etiqueta-total text-dark">Sueldo Bruto</strong>
                                                    <strong id="sueldo-bruto" className="monto-total text-dark">$</strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 px-4 columna-resultados columna-descuentos">
                                            <h3 className="fs-5 mb-4">Descuentos Legales</h3>
                                            <div className="mt-3 detalle-resultados">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">AFP</span>
                                                    <span id="afp" className="fw-bold monto-resultado">$</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between mb-3">
                                                    <span className="etiqueta-resultado">Salud</span>
                                                    <span id="salud" className="fw-bold monto-resultado">$</span>
                                                </div>
                                                <hr className="text-muted" />
                                                <div className="d-flex justify-content-between fs-5">
                                                    <strong className="etiqueta-total text-dark">Sueldo Liquido</strong>
                                                    <strong id="sueldo-liquido" className="monto-total text-dark">$</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );

}

export default CalculadoraSueldos;