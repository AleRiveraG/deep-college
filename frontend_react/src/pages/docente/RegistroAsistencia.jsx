import Header from "../../components/header";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { useState } from "react";

function RegistroAsistencia() {
    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [botones, setBotones] = useState(false);

    return(
        <>  
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <NavBar />
                        <section className="col-md-10 py-4 px-4">
                            <h1 className="mb-4">Registro de asistencia</h1>
                            <h2 className="fs-6 mb-4">Registra la asistencia de los alumnos de cada clase.</h2>

                            <div className="caja-valor p-4 mb-4">
                                <label htmlFor="curso" className="fw-bold mb-2">Seleccione curso:</label>
                                <select id="curso" className="form-select w-25 campo-formulario" onChange={ () => {
                                                                                                        setMostrarFormulario(true);
                                                                                                        setBotones(false) }}>
                                    <option value="1-medio">1° Medio</option>
                                    <option value="2-medio">2° Medio</option>
                                    <option value="3-medio">3° Medio</option>
                                    <option value="4-medio">4° Medio</option>
                                </select>
                            </div>

                            {mostrarFormulario &&
                                <div id="tabla-1" className="table-responsive">
                                    <table className="table mb-0 align-middle">
                                        <thead className="encabezado-tabla">
                                            <tr>
                                                <th scope="col" style={{width: "10%"}}>Número</th>
                                                <th scope="col" style={{width: "30%"}}>Nombres</th>
                                                <th scope="col" style={{width: "30%"}}>Apellidos</th>
                                                <th scope="col" style={{width: "30%"}}>Registro</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Toy Khan</td>
                                                <td>Zhaito Perez</td>
                                                <td>
                                                    <form className="d-flex gap-2 mb-0">
                                                        <input type="radio" className="btn-check botones presente" name="asistencia_1" id="presente_1_1" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_1_1">Presente</label>

                                                        <input type="radio" className="btn-check botones ausente" name="asistencia_1" id="ausente_1_1" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_1_1">Ausente</label>
                                                    </form>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>AK Mezako</td>
                                                <td>Susake Martinez</td>
                                                <td>
                                                    <form className="d-flex gap-2 mb-0">
                                                        <input type="radio" className="btn-check botones presente" name="asistencia_2" id="presente_1_2" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_1_2">Presente</label>

                                                        <input type="radio" className="btn-check botones ausente" name="asistencia_2" id="ausente_1_2" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_1_2">Ausente</label>
                                                    </form>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Tai Mah</td>
                                                <td>Won Silva</td>
                                                <td>
                                                    <form className="d-flex gap-2 mb-0">
                                                        <input type="radio" className="btn-check botones presente" name="asistencia_3" id="presente_1_3" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_1_3">Presente</label>

                                                        <input type="radio" className="btn-check botones ausente" name="asistencia_3" id="ausente_1_3" autocomplete="off" disabled={!botones} />
                                                        <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_1_3">Ausente</label>
                                                    </form>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                            <div id="tabla-2" className="d-none table-responsive">
                                <table className="table mb-0 align-middle">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th scope="col" style={{width: "10%"}}>Número</th>
                                            <th scope="col" style={{width: "30%"}}>Nombres</th>
                                            <th scope="col" style={{width: "30%"}}>Apellidos</th>
                                            <th scope="col" style={{width: "30%"}}>Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Juan Alberto</td>
                                            <td>Silva Perez</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_1" id="presente_2_1" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_2_1">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_1" id="ausente_2_1" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_2_1">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>John Albert</td>
                                            <td>Doe Martinez</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_2" id="presente_2_2" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_2_2">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_2" id="ausente_2_2" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_2_2">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Jane Margaret</td>
                                            <td>Doe Silva</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_3" id="presente_2_3" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_2_3">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_3" id="ausente_2_3" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_2_3">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            
                            <div id="tabla-3" className="d-none table-responsive">
                                <table className="table mb-0 align-middle">
                                    <thead className="encabezado-tabla">
                                        <tr>
                                            <th scope="col" style={{width: "10%"}}>Número</th>
                                            <th scope="col" style={{width: "30%"}}>Nombres</th>
                                            <th scope="col" style={{width: "30%"}}>Apellidos</th>
                                            <th scope="col" style={{width: "30%"}}>Registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Armando Esteban</td>
                                            <td>Quito Perez</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_1" id="presente_3_1" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_3_1">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_1" id="ausente_3_1" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_3_1">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Elena Nito</td>
                                            <td>Del Bosque Martinez</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_2" id="presente_3_2" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_3_2">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_2" id="ausente_3_2" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_3_2">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Marcos Solomeo</td>
                                            <td>Paredes Silva</td>
                                            <td>
                                                <form className="d-flex gap-2 mb-0">
                                                    <input type="radio" className="btn-check botones presente" name="asistencia_3" id="presente_3_3" autocomplete="off" />
                                                    <label className="btn btn-outline-success btn-sm px-3" htmlFor="presente_3_3">Presente</label>

                                                    <input type="radio" className="btn-check botones ausente" name="asistencia_3" id="ausente_3_3" autocomplete="off" />
                                                    <label className="btn btn-outline-danger btn-sm px-3" htmlFor="ausente_3_3">Ausente</label>
                                                </form>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {mostrarFormulario &&
                                <div id="cont-botones">
                                    <div className="d-flex justify-content-end gap-3 mt-4">
                                        <button type="submit" className="boton-calcular px-4 registrar" 
                                        onClick={ (evento) => {
                                            evento.preventDefault();
                                            setBotones(true);
                                        }}
                                        >
                                            Registrar asistencia
                                        </button>
                                        <button type="reset" className="btn btn-outline-secondary px-4 finalizar"
                                        onClick={ (evento) => {
                                            evento.preventDefault();
                                            alert("Clase finalizada con exito!");
                                            setBotones(false);
                                        }}
                                        >Finalizar clase</button>
                                    </div>
                                </div>
                            }
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>

    );
}

export default RegistroAsistencia;