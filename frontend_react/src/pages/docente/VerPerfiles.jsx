import Header from "../../components/header";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";

function VerPerfiles() {

    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <NavBar />
                        <section className="col-md-10 py-4 px-4">
                            <h1 className="mb-4">Ver perfiles por curso</h1>
                            <h2 className="fs-6 mb-4">Consulta los datos de los alumnos por curso.</h2>
                            <div className="caja-valor p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <label htmlFor="cursos" className="fw-bold mb-2">Seleccione un curso:</label>
                                    <select id="cursos" className="form-select campo-formulario">
                                        <option value="1-medio">1° Medio</option>
                                        <option value="2-medio">2° Medio</option>
                                        <option value="3-medio">3° Medio</option>
                                        <option value="4-medio">4° Medio</option>
                                    </select>
                                </div>
                                <div className="">
                                    <div className="contenedor-busqueda">
                                        <input id="busqueda" className="form-control busqueda-input" placeholder="Buscar por nombre" />
                                        <i className="bx bx-search icono-busqueda"></i>
                                    </div>
                                </div>
                            </div>

                            
                            <div id="tabla-1" className="table-responsive tabla d-none">
                                <table className="table mb-0">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th>Número</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Rut</th>
                                            <th>Telefono</th>
                                            <th>Correo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Toy Khan</td>
                                            <td>Zhaito Perez</td>
                                            <td>12.345.678-9</td>
                                            <td>9 9876 5432</td>
                                            <td>khan.zhaito@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>AK Mezako</td>
                                            <td>Susake Martinez</td>
                                            <td>98.765.432-1</td>
                                            <td>9 1234 5432</td>
                                            <td>mezako.susake@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Tai Mah</td>
                                            <td>Won Silva</td>
                                            <td>89.755.422-2</td>
                                            <td>9 1234 5432</td>
                                            <td>tai.won@estudiante.deepcollege.cl</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            
                            <div id="tabla-2" className="table-responsive tabla d-none">
                                <table className="table mb-0">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th>Número</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Rut</th>
                                            <th>Telefono</th>
                                            <th>Correo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Juan Alberto</td>
                                            <td>Silva Perez</td>
                                            <td>13.344.677-9</td>
                                            <td>9 9776 5442</td>
                                            <td>juan.perez@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>John Albert</td>
                                            <td>Doe Martinez</td>
                                            <td>98.765.432-1</td>
                                            <td>9 1234 5432</td>
                                            <td>john.doe@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Jane Margaret</td>
                                            <td>Doe Silva</td>
                                            <td>89.755.422-2</td>
                                            <td>9 1234 5432</td>
                                            <td>jane.doe@estudiante.deepcollege.cl</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            
                            <div id="tabla-3" className="table-responsive tabla d-none">
                                <table className="table mb-0">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th>Número</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Rut</th>
                                            <th>Telefono</th>
                                            <th>Correo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Armando Esteban</td>
                                            <td>Quito Perez</td>
                                            <td>12.345.678-9</td>
                                            <td>9 9876 5432</td>
                                            <td>esteban.quito@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Elena Nito</td>
                                            <td>Del Bosque Martinez</td>
                                            <td>98.765.432-1</td>
                                            <td>9 1234 5432</td>
                                            <td>elena.nito@estudiante.deepcollege.cl</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Marcos Solomeo</td>
                                            <td>Paredes Silva</td>
                                            <td>89.755.422-2</td>
                                            <td>9 1234 5432</td>
                                            <td>solomeo.paredes@estudiante.deepcollege.cl</td>
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

export default VerPerfiles;