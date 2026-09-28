import Header from "../../components/header";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { useState } from "react";

function RegistroNotas() {
    
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const [promedio, setPromedio] = useState("");
    const [notas, setNotas] = useState({
        es1: "",
        es2: "",
        ef1: "",
        ef2: "",
        ed1: "",
        ed2: "",
        ed3: ""
    });
    
    return(
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <NavBar />
                        <section className="col-md-10 py-4 px-4">
                            <h1 className="mb-4">Registro de notas</h1>
                            <h2 className="fs-6 mb-4">Registra las calificaciones y calcula los promedios de tus alumnos.</h2>
                            
                            <div className="caja-valor p-4 mb-4">
                                <label htmlFor="curso" className="fw-bold mb-2">Seleccione un curso:</label>
                                <select id="curso" className="form-select w-25 campo-formulario" onChange={ () => setMostrarFormulario(true)}>
                                    <option value="1-medio">1° Medio</option>
                                    <option value="2-medio">2° Medio</option>
                                    <option value="3-medio">3° Medio</option>
                                    <option value="4-medio">4° Medio</option>
                                </select>
                            </div>
                            
                            {mostrarFormulario &&
                                <div id="tabla-1" className="table-responsive tabla">
                                    <table className="table mb-0 text-center align-middle">
                                        <thead className="encabezado-tabla">
                                            <tr>
                                                <th colSpan="2" className="border-end border-bottom-0"></th>
                                                <th colSpan="2" className="border-end text-white" style={{backgroundColor: "#1C2866"}}>Sumativa (35%)</th>
                                                <th colSpan="2" className="border-end text-white" style={{backgroundColor: "#283A94"}}>Formativa (35%)</th>
                                                <th colSpan="3" className="border-end text-white" style={{backgroundColor: "#334ABD"}}>Desempeño (30%)</th>
                                                <th className="border-bottom-0"></th>
                                            </tr>
                                            <tr>
                                                <th className="border-end" style={{width: "5%"}}>Número</th>
                                                <th className="border-end text-start" style={{width: "20%"}}>Estudiante</th>
                                                <th style={{width: "8%"}}>ES1</th>
                                                <th className="border-end" style={{width: "8%"}}>ES2</th>
                                                <th style={{width: "8%"}}>EF1</th>
                                                <th className="border-end" style={{width: "8%"}}>EF2</th>
                                                <th style={{width: "8%"}}>ED1</th>
                                                <th style={{width: "8%"}}>ED2</th>
                                                <th className="border-end" style={{width: "8%"}}>ED3</th>
                                                <th>Promedio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-end">1</td>
                                                <td className="border-end text-start">Khan Zhaito</td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es1" placeholder="Ej: 7.0" value={notas.es1} onChange={ (evento) => setNotas({...notas, es1: evento.target.value})}/>
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es2" placeholder="Ej: 7.0" value={notas.es2} onChange={ (evento) => setNotas({...notas, es2: evento.target.value})} />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef1" placeholder="Ej: 7.0" value={notas.ef1} onChange={ (evento) => setNotas({...notas, ef1: evento.target.value})}/>
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef2" placeholder="Ej: 7.0" value={notas.ef2} onChange={ (evento) => setNotas({...notas, ef2: evento.target.value})}/>
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed1" placeholder="Ej: 7.0" value={notas.ed1} onChange={ (evento) => setNotas({...notas, ed1: evento.target.value})}/>
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed2" placeholder="Ej: 7.0" value={notas.ed2} onChange={ (evento) => setNotas({...notas, ed2: evento.target.value})}/>
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed3" placeholder="Ej: 7.0" value={notas.ed3} onChange={ (evento) => setNotas({...notas, ed3: evento.target.value})}/>
                                                </td>
                                                <td className="fw-bold monto-valor promedio"></td>
                                            </tr>
                                            <tr>
                                                <td className="border-end">2</td>
                                                <td className="border-end text-start">Mezako Susake</td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed3" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="fw-bold monto-valor promedio">{promedio}</td>
                                            </tr>
                                            <tr>
                                                <td className="border-end">3</td>
                                                <td className="border-end text-start">Tai Won</td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario es2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ef2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed1" placeholder="Ej: 7.0" />
                                                </td>
                                                <td>
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed2" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="border-end">
                                                    <input type="text" className="form-control form-control-sm text-center px-1 campo-formulario ed3" placeholder="Ej: 7.0" />
                                                </td>
                                                <td className="fw-bold monto-valor promedio"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            } 
                            
                            {mostrarFormulario &&
                                <div id="cont-botones">
                                    <div className="d-flex justify-content-end gap-3 mt-4">
                                        <button id="btn-calcular" className="btn btn-outline-secondary px-4"
                                        >Calcular</button>
                                        <button id="btn-registrar" className="boton-calcular px-4"
                                        >Registrar</button>
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

export default RegistroNotas;