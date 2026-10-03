import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

function Horario() {
    
    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        
                        <Navbar />
                        <section className="col-md-10 py-4 px-4 seccion-horarios">
                            <h1 className="titulo-principal mb-4">Mi horario</h1>
                            <h2 className="fs-6 mb-4">Revisa tu horario y organiza mejor tu jornada académica.</h2>
                            <div className="table-responsive contenedor-tabla">
                                <table id="horario" className="table table-bordered table-striped text-center align-middle tabla-horarios bg-white">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th>Módulo</th>
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
                                            <td className="celda-asignatura">Estadistica</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Aplicaciones Moviles</td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">08:41-09:20</td>
                                            <td className="celda-asignatura">Estadistica</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Aplicaciones Moviles</td>
                                            <td className="celda-asignatura">Aplicaciones Moviles</td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">09:31-10:10</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
                                            <td className="celda-asignatura">Aplicaciones Moviles</td>
                                            <td className="celda-asignatura">Estadistica</td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">10:11-10:50</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
                                            <td className="celda-asignatura">Aplicaciones Moviles</td>
                                            <td className="celda-asignatura">Estadistica </td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">11:01-11:40</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">11:41-12:20</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Taller Base de Datos</td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura"></td>
                                        </tr>
                                        <tr className="fila-horario">
                                            <td className="fw-bold celda-hora">12:31-13:10</td>
                                            <td className="celda-asignatura"></td>
                                            <td className="celda-asignatura">Taller Base de Datos</td>
                                            <td className="celda-asignatura">Desarrollo FullStack II</td>
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

export default Horario;