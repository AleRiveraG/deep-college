import Header from "../../components/Header";
import SidebarDirectiva from "../../components/SidebarDirectiva";
import Footer from "../../components/Footer";

function GestionAcademica() {
    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        
                        <SidebarDirectiva />
                        <section className="col-md-10 py-4 px-4 seccion-gestion">
                            
                            <div className="resumen-general mb-5">
                                <h1 className="mb-4">Resumen General</h1>
                                <h2 className="fs-6 mb-4">Gestiona y administra la información de la comunidad escolar.</h2>
                                
                                <div className="row text-center contenedor-valores g-4">
                                    <div className="col-md-3">
                                        <div className="p-3 border caja-valor h-100">
                                            <i className="bx bx-people-diversity fs-2"></i>
                                            <span className="d-block mb-1 etiqueta-valor small">Número de estudiantes</span>
                                            <strong id="estudiantes" className="monto-valor fs-4">300</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border caja-valor h-100">
                                            <i className="bx bx-group fs-2"></i>
                                            <span className="d-block mb-1 etiqueta-valor small">Número de docentes</span>
                                            <strong id="docentes" className="monto-valor fs-4">30</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border caja-valor h-100">
                                            <i className="bx bx-hail fs-2"></i>
                                            <span className="d-block mb-1 etiqueta-valor small">Número de auxiliares</span>
                                            <strong id="auxiliares" className="monto-valor fs-4">20</strong>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-3 border caja-valor h-100">
                                            <i className="bx bx-school fs-2"></i>
                                            <span className="d-block mb-1 etiqueta-valor small">Cursos</span>
                                            <strong className="monto-valor fs-4">12</strong>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="text-end mt-4">
                                    <button id="btn-registro" className="btn btn-sm boton-calcular px-4">Nuevo registro</button>
                                </div>
                            </div>

                            <hr className="my-5" style={{ borderColor: "#283A94" }} />

                            <div className="formularios contenedor-formulario d-none">
                                <div className="d-flex align-items-center mb-4 ">
                                    <i className="bx bx-form fs-3 me-2 text-primary"></i>
                                    <h2 id="titulo" className="m-0 fs-4">Gestión de Registros</h2>
                                </div>

                                <form className="mb-5 p-3 border rounded caja-valor">
                                    <span className="fw-bold me-3 small">Seleccione una opción:</span>
                                    <div className="form-check form-check-inline">
                                        <input id="docente" type="radio" name="opcion" className="form-check-input" />
                                        <label htmlFor="docente" className="form-check-label small">Docente</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input id="estudiante" type="radio" name="opcion" className="form-check-input" />
                                        <label htmlFor="estudiante" className="form-check-label small">Estudiante</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input id="auxiliar" type="radio" name="opcion" className="form-check-input" />
                                        <label htmlFor="auxiliar" className="form-check-label small">Auxiliar</label>
                                    </div>
                                </form>

                                <div id="form-docente" className="d-none">
                                    <h3 className="mt-4 mb-3 fs-5">Formulario Docente</h3>
                                    <form className="form-docente border p-4 mb-5 rounded caja-valor">
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="nombre-docente" className="form-label fw-bold small">Nombre del docente *</label>
                                                
                                                <input id="nombre-docente" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="rut-docente" className="form-label fw-bold small">Rut del docente *</label>
                                                <input id="rut-docente" type="text" className="form-control form-control-sm campo-formulario" placeholder="12.345.678-9" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="nivel-docente" className="form-label fw-bold small">Nivel de enseñanza *</label>
                                                <select id="nivel-docente" className="form-select form-select-sm campo-formulario">
                                                    <option>Educación básica</option>
                                                    <option>Educación media</option>                                
                                                </select>
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="fecha-contrato-docente" className="form-label fw-bold small">Fecha de inicio: </label>
                                                <input id="fecha-contrato-docente" type="date" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="correo-docente" className="form-label fw-bold small">Correo del docente *</label>
                                                <input id="correo-docente" type="email" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="telefono-docente" className="form-label fw-bold small">Teléfono docente *</label>
                                                <input id="telefono-docente" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="observaciones-docente" className="form-label fw-bold small">Observaciones</label>
                                            <textarea id="observaciones-docente" className="form-control form-control-sm campo-formulario" rows="2"></textarea>
                                        </div>
                                        <div className="text-end">
                                            <button id="btn-aplicar-docente" type="submit" className="btn btn-sm boton-calcular px-4">Aplicar cambios</button>
                                            <button id="btn-reset-docente" type="reset" className="btn btn-sm btn-outline-secondary px-4 ms-2">Reiniciar</button>
                                        </div>
                                    </form>
                                </div>
                                
                                <div id="form-estudiante" className="d-none">
                                    <h3 className="mt-4 mb-3 fs-5">Formulario Estudiante</h3>
                                    <form className="form-estudiante border p-4 mb-5 rounded caja-valor">
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="nombre-alumno" className="form-label fw-bold small">Nombre del alumno *</label>
                                                <input id="nombre-alumno" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="rut-alumno" className="form-label fw-bold small">Rut del alumno *</label>
                                                <input id="rut-alumno" type="text" className="form-control form-control-sm campo-formulario" placeholder="12.345.678-9" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="curso" className="form-label fw-bold small">Curso *</label>
                                                <select id="curso" className="form-select form-select-sm campo-formulario">
                                                    <option>1° Básico</option>
                                                    <option>2° Básico</option>
                                                    <option>3° Básico</option>
                                                    <option>4° Básico</option>
                                                    <option>5° Básico</option>
                                                    <option>6° Básico</option>
                                                    <option>7° Básico</option>
                                                    <option>8° Básico</option>
                                                    <option>1° Medio</option>
                                                    <option>2° Medio</option>
                                                    <option>3° Medio</option>
                                                    <option>4° Medio</option>                                    
                                                </select>
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="estado-alumno" className="form-label fw-bold small">Estado</label>
                                                <select id="estado-alumno" className="form-select form-select-sm campo-formulario">
                                                    <option>Activo</option>
                                                    <option>Condicional</option>
                                                    <option>Retirado</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="apoderado" className="form-label fw-bold small">Apoderado titular *</label>
                                                <input id="apoderado" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="telefono-apoderado" className="form-label fw-bold small">Teléfono Apoderado *</label>
                                                <input id="telefono-apoderado" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="observaciones-alumno" className="form-label fw-bold small">Observaciones</label>
                                            <textarea id="observaciones-alumno" className="form-control form-control-sm campo-formulario" rows="2"></textarea>
                                        </div>
                                        <div className="text-end">
                                            <button id="btn-aplicar-alumno" type="submit" className="btn btn-sm boton-calcular px-4">Aplicar</button>
                                            <button id="btn-reset-alumno" type="reset" className="btn btn-sm btn-outline-secondary px-4 ms-2">Reiniciar</button>
                                        </div>
                                    </form>
                                </div>
                                
                                
                                <div id="form-auxiliar" className="d-none form-auxiliar">
                                    <h3 className="mt-4 mb-3 fs-5">Formulario Auxiliar</h3>
                                    <form className="form-auxiliar border p-4 mb-5 rounded caja-valor">
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="nombre-auxiliar" className="form-label fw-bold small">Nombre *</label>
                                                <input id="nombre-auxiliar" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="rut-auxiliar" className="form-label fw-bold small">Rut *</label>
                                                <input id="rut-auxiliar" type="text" className="form-control form-control-sm campo-formulario" placeholder="12.345.678-9" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="cargo" className="form-label fw-bold small">Cargo *</label>
                                                <select id="cargo" className="form-select form-select-sm campo-formulario">
                                                    <option>Auxiliar de aseo</option>
                                                    <option>Inspector/a</option>                                
                                                    <option>Portero/a</option>
                                                    <option>Mantención</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="fecha-contrato-aux" className="form-label fw-bold small">Fecha de inicio: </label>
                                                <input id="fecha-contrato-aux" type="date" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="correo-auxiliar" className="form-label fw-bold small">Correo *</label>
                                                <input id="correo-auxiliar" type="email" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                            <div className="col-md-6 mt-3 mt-md-0">
                                                <label htmlFor="telefono-auxiliar" className="form-label fw-bold small">Teléfono auxiliar *</label>
                                                <input id="telefono-auxiliar" type="text" className="form-control form-control-sm campo-formulario" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="observaciones-auxiliar" className="form-label fw-bold small">Observaciones</label>
                                            <textarea id="observaciones-auxiliar" className="form-control form-control-sm campo-formulario" rows="2"></textarea>
                                        </div>
                                        <div className="text-end">
                                            <button id="btn-aplicar-auxiliar" type="submit" className="btn btn-sm boton-calcular px-4">Aplicar</button>
                                            <button id="btn-reset-auxiliar" type="reset" className="btn btn-sm btn-outline-secondary px-4 ms-2">Reiniciar</button>
                                        </div>
                                    </form> 
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

export default GestionAcademica;