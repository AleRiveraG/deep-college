import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState } from "react";
 
const grupos = {
  grupo1: [
    { numero: '1', nombre: 'Toy Khan', apellidos: 'Zhaito Perez', rut: '12.345.678-9', telefono: '9 9876 5432', correo: 'khan.zhaito@estudiante.deepcollege.cl' },
    { numero: '2', nombre: 'AK Mezako', apellidos: 'Susake Martinez', rut: '98.765.432-1', telefono: '9 1234 5432', correo: 'mezako.susake@estudiante.deepcollege.cl' },
    { numero: '3', nombre: 'Tai Mah', apellidos: 'Won Silva', rut: '89.755.422-2', telefono: '9 1234 5432', correo: 'tai.won@estudiante.deepcollege.cl' },
  ],
  grupo2: [
    { numero: '1', nombre: 'Juan Alberto', apellidos: 'Silva Perez', rut: '13.344.677-9', telefono: '9 9776 5442', correo: 'juan.perez@estudiante.deepcollege.cl' },
    { numero: '2', nombre: 'John Albert', apellidos: 'Doe Martinez', rut: '98.765.432-1', telefono: '9 1234 5432', correo: 'john.doe@estudiante.deepcollege.cl' },
    { numero: '3', nombre: 'Jane Margaret', apellidos: 'Doe Silva', rut: '89.755.422-2', telefono: '9 1234 5432', correo: 'jane.doe@estudiante.deepcollege.cl' },
  ],
  grupo3: [
    { numero: '1', nombre: 'Armando Esteban', apellidos: 'Quito Perez', rut: '12.345.678-9', telefono: '9 9876 5432', correo: 'esteban.quito@estudiante.deepcollege.cl' },
    { numero: '2', nombre: 'Elena Nito', apellidos: 'Del Bosque Martinez', rut: '98.765.432-1', telefono: '9 1234 5432', correo: 'elena.nito@estudiante.deepcollege.cl' },
    { numero: '3', nombre: 'Marcos Solomeo', apellidos: 'Paredes Silva', rut: '89.755.422-2', telefono: '9 1234 5432', correo: 'solomeo.paredes@estudiante.deepcollege.cl' },
  ],
};
 
function obtenerGrupo(curso) {
  if (curso === '1-medio' || curso === '4-medio') return 'grupo1';
  if (curso === '2-medio') return 'grupo2';
  return 'grupo3';
}
 
function VerPerfiles() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [texto, setTexto] = useState('');
 
  const grupoActivo = cursoSeleccionado ? obtenerGrupo(cursoSeleccionado) : null;
  const alumnos = grupoActivo ? grupos[grupoActivo] : [];
 
  // se comparan los campos del alumno en lugar de recorrer todo el texto pequeña mejora
  const resultados = alumnos.filter((alumno) => {
    const texto_completo = `${alumno.nombre} ${alumno.apellidos} ${alumno.rut} ${alumno.telefono} ${alumno.correo}`.toLowerCase();
    return texto_completo.includes(texto.toLowerCase());
  });
 
  return (
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
                  <select id="cursos" className="form-select campo-formulario" value={cursoSeleccionado} onChange={(e) => setCursoSeleccionado(e.target.value)}>
                    <option value="" disabled>Seleccione</option>
                    <option value="1-medio">1° Medio</option>
                    <option value="2-medio">2° Medio</option>
                    <option value="3-medio">3° Medio</option>
                    <option value="4-medio">4° Medio</option>
                  </select>
                </div>
                <div>
                  <div className="contenedor-busqueda">
                    <input id="busqueda" className="form-control busqueda-input" placeholder="Buscar por nombre" value={texto} onChange={(e) => setTexto(e.target.value)} />
                    <i className="bx bx-search icono-busqueda"></i>
                  </div>
                </div>
              </div>
 
              {grupoActivo && (
                <div id={`tabla-${grupoActivo.slice(-1)}`} className="table-responsive tabla">
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
                      {resultados.map((alumno) => (
                        <tr key={alumno.rut}>
                          <td>{alumno.numero}</td>
                          <td>{alumno.nombre}</td>
                          <td>{alumno.apellidos}</td>
                          <td>{alumno.rut}</td>
                          <td>{alumno.telefono}</td>
                          <td>{alumno.correo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
 
export default VerPerfiles;