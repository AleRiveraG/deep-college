import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SidebarDirectiva from "../../components/SidebarDirectiva";

function Horarios() {
    return(
        <>
            <Header />
            <main>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <SidebarDirectiva />
                    
                    <section className="col-md-10 py-4 px-4 seccion-horarios">
                        <h1 className="mb-4">Horarios</h1>
                        <h2 className="fs-6 mb-4">Consulta los horarios de cada curso.</h2>
                        
                        <div className="mb-4 contenedor-filtro">
                            <div className="row">
                                <div className="col-md-4">
                                    <label htmlFor="curso" className="form-label fw-bold small">Seleccione un curso:</label>
                                    <select id="curso" className="form-select campo-formulario">
                                        <option value="1ro-basico">1° Básico</option>
                                        <option value="2do-basico">2° Básico</option>
                                        <option value="3ro-basico">3° Básico</option>
                                        <option value="4to-basico">4° Básico</option>
                                        <option value="5to-basico">5° Básico</option>
                                        <option value="6to-basico">6° Básico</option>
                                        <option value="7mo-basico">7° Básico</option>
                                        <option value="8vo-basico">8° Básico</option>
                                        <option value="1ro-medio">1° Medio</option>
                                        <option value="2do-medio">2° Medio</option>
                                        <option value="3ro-medio">3° Medio</option>
                                        <option value="4to-medio">4° Medio</option>  
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive contenedor-tabla">
                            <table id="horario" className="table table-bordered tabla-horarios text-center align-middle d-none">
                                <thead className="encabezado-tabla">
                                    <tr>
                                        <th>Módulo Horario</th>
                                        <th>Lunes</th>
                                        <th>Martes</th>
                                        <th>Miércoles</th>
                                        <th>Jueves</th>
                                        <th>Viernes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">08:01-08:40</td>
                                        <td className="celda-asignatura">Estadística</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Desarrollo de Aplicaciones Móviles</td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">08:41-09:20</td>
                                        <td className="celda-asignatura">Estadística</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Desarrollo de Aplicaciones Móviles</td>
                                        <td className="celda-asignatura">Desarrollo de Aplicaciones Móviles</td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">09:31-10:10</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Desarrollo Fullstack II</td>
                                        <td className="celda-asignatura">Desarrollo de Aplicaciones Móviles</td>
                                        <td className="celda-asignatura">Estadística</td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">10:11-10:50</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Desarrollo Fullstack II</td>
                                        <td className="celda-asignatura">Desarrollo de Aplicaciones Móviles</td>
                                        <td className="celda-asignatura">Estadística</td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">11:01-11:40</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Desarrollo Fullstack II</td>
                                        <td className="celda-asignatura">Desarrollo Fullstack II</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                    <tr className="fila-horario">
                                        <td className="fw-bold celda-hora">11:41-12:20</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura">Taller de Base de Datos</td>
                                        <td className="celda-asignatura">Desarrollo Fullstack II</td>
                                        <td className="celda-asignatura"></td>
                                        <td className="celda-asignatura"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </main>
        <Footer />

        </>
    );
}

export default Horarios;