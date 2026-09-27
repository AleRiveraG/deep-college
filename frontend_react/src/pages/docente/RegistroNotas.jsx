import Header from "../../components/header";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function RegistroNotas() {

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <NavBar />
                        <section className="col-md-10 py-4 px-4">
                            <h1 className="mb-4">Registro de notas</h1>
                            <h2 className="fs-6 mb-4">Consulta las calificaciones generales de cada curso.</h2>
                            
                            <div className="p-4 mb-5 caja-valor">
                                <label htmlFor="curso" className="form-label fw-bold small">Seleccione un curso:</label>
                                <select id="curso" className="form-select campo-formulario w-25">
                                    <option value="1-basico" >1° Básico</option>
                                    <option value="2-basico">2° Básico</option>
                                    <option value="3-basico">3° Básico</option>
                                    <option value="4-basico">4° Básico</option>
                                    <option value="5-basico">5° Básico</option>
                                    <option value="6-basico">6° Básico</option>
                                    <option value="7-basico">7° Básico</option>
                                    <option value="8-basico">8° Básico</option>
                                    <option value="1-medio">1° Medio</option>
                                    <option value="2-medio">2° Medio</option>
                                    <option value="3-medio">3° Medio</option>
                                    <option value="4-basico">4° Medio</option>  
                                </select>
                            </div>

                            <div className="resumenes row m-0 d-none">
                                
                                <div className="curso-1-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 1° Básico</h2>
                                        <label htmlFor="promedio-1" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-1" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-2-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 2° Básico</h2>
                                        <label htmlFor="promedio-2" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-2" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-3-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 3° Básico</h2>
                                        <label htmlFor="promedio-3" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-3" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-4-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 4° Básico</h2>
                                        <label htmlFor="promedio-4" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-4" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-5-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 5° Básico</h2>
                                        <label htmlFor="promedio-5" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-5" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-6-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 6° Básico</h2>
                                        <label htmlFor="promedio-6" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-6" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-7-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 7° Básico</h2>
                                        <label htmlFor="promedio-7" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-7" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-8-basico col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 8° Básico</h2>
                                        <label htmlFor="promedio-8" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-8" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-1-medio col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 1° Medio</h2>
                                        <label htmlFor="promedio-9" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-9" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-2-medio col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 2° Medio</h2>
                                        <label htmlFor="promedio-10" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-10" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-3-medio col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 3° Medio</h2>
                                        <label htmlFor="promedio-11" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-11" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="curso-4-medio col-12 mb-4 p-0 d-none">
                                    <div className="p-4 caja-valor">
                                        <h2 className="fs-5 mb-3">Curso: 4° Medio</h2>
                                        <label htmlFor="promedio-12" className="form-label fw-bold small">Promedio de notas</label>
                                        <progress id="promedio-12" max="7" value="5.8" className="w-100 mb-4"></progress>
                                        <div className="d-flex justify-content-around text-center">
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">30</span>
                                                <span>Total alumnos</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-valor">20</span>
                                                <span>Alumnos sobre nota 4.0</span>
                                            </div>
                                            <div>
                                                <span className="d-block fs-3 fw-bold monto-negativo">10</span>
                                                <span>Alumnos bajo nota 4.0</span>
                                            </div>
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

export default RegistroNotas;