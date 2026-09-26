import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SidebarDirectiva from "../../components/SidebarDirectiva";

function VerPerfiles() {
    return(
        
        <>
            <Header />
            <main>
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        
                        <SidebarDirectiva />
                        <section className="col-md-10 py-4 px-4">
                            
                            <h1 className="mb-4">Consulta de perfiles</h1>
                            <h2 className="fs-6 mb-4">Consulta la información de toda la comunidad escolar.</h2>

                            <div>
                                <div className="contenedor-busqueda mb-4">
                                    <input id="busqueda" className="form-control busqueda-input" placeholder="Buscar por nombre" />
                                    <i className="bx bx-search icono-busqueda"></i>
                                </div>
                                
                                
                                <div className="table-responsive">
                                    <table id="perfiles" className="table table-striped align-middle mb-0">
                                        <thead className="encabezado-tabla">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Rut</th>
                                                <th>Rol</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="nombres">Khan Zhaito</td>
                                                <td className="rut">12.345.678-9</td>
                                                <td><span className="badge rol-docente">Docente</span></td>
                                                <td>
                                                    <a href="#" className="boton-accion btn-editar">
                                                        <i className="bx bx-edit icono-editar"></i>
                                                    </a>
                                                    <a href="#" className="boton-accion btn-eliminar">
                                                        <i className="bx bx-trash icono-eliminar"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="nombres">Tai Mah Won</td>
                                                <td className="rut">98.765.432-1</td>
                                                <td><span className="badge rol-estudiante">Estudiante</span></td>
                                                <td>
                                                    <a href="#" className="boton-accion btn-editar">
                                                        <i className="bx bx-edit icono-editar"></i>
                                                    </a>
                                                    <a href="#" className="boton-accion btn-eliminar">
                                                        <i className="bx bx-trash icono-eliminar"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="nombres">Mezako Susake</td>
                                                <td className="rut">11.225.578-9</td>
                                                <td><span className="badge rol-auxiliar">Auxiliar</span></td>
                                                <td>
                                                    <a href="#" className="boton-accion btn-editar">
                                                        <i className="bx bx-edit icono-editar"></i>
                                                    </a>
                                                    <a href="#" className="boton-accion btn-eliminar">
                                                        <i className="bx bx-trash icono-eliminar"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                                
                            </div>
                        </section>
                    </div>
                </div>
                
                <div className="modal" id="editarUsuarioModal" tabindex="-1">
                    <div className="modal-dialog modal-dialog-centered"> 
                        <div className="modal-content">
                            <div className="modal-header justify-content-center border-bottom-0 pb-0">
                                <h2 className="fs-4 mb-0">Editar usuario</h2>
                            </div>
                            <div className="modal-body p-4">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="nombre" className="form-label fw-bold small">Nombre *</label>
                                            <input id="nombre" type="text" className="form-control form-control-sm campo-formulario" /> 
                                        </div>
                                        <div className="col-md-6 mt-3 mt-md-0">
                                            <label htmlFor="rut" className="form-label fw-bold small">Rut *</label>
                                            <input id="rut" type="text" className="form-control form-control-sm campo-formulario" placeholder="12.345.678-9" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="rol" className="form-label fw-bold small">Rol *</label>
                                        <select id="rol" className="form-select form-select-sm campo-formulario">
                                            <option>Estudiante</option>
                                            <option>Docente</option>                                
                                            <option>Auxiliar</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer justify-content-center border-top-0 pt-0 pb-4">
                                <div className="botones d-flex gap-3">
                                    <button className="btn btn-sm boton-calcular closeModalBtn px-4">Editar</button>
                                    <button className="btn btn-sm btn-outline-secondary btn-cerrar px-4">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );

}

export default VerPerfiles;