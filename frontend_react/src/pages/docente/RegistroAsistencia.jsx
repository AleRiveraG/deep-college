import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState } from "react";
 
const grupos = {
  grupo1: [
    { numero: 1, nombres: 'Toy Khan', apellidos: 'Zhaito Perez' },
    { numero: 2, nombres: 'AK Mezako', apellidos: 'Susake Martinez' },
    { numero: 3, nombres: 'Tai Mah', apellidos: 'Won Silva' },
  ],
  grupo2: [
    { numero: 1, nombres: 'Juan Alberto', apellidos: 'Silva Perez' },
    { numero: 2, nombres: 'John Albert', apellidos: 'Doe Martinez' },
    { numero: 3, nombres: 'Jane Margaret', apellidos: 'Doe Silva' },
  ],
  grupo3: [
    { numero: 1, nombres: 'Armando Esteban', apellidos: 'Quito Perez' },
    { numero: 2, nombres: 'Elena Nito', apellidos: 'Del Bosque Martinez' },
    { numero: 3, nombres: 'Marcos Solomeo', apellidos: 'Paredes Silva' },
  ],
};
 
//la tabla va cambiando segun el curso que se seleccione
function obtenerGrupo(curso) {
  if (curso === '1-medio' || curso === '4-medio') return 'grupo1';
  if (curso === '2-medio') return 'grupo2';
  return 'grupo3';
}
 
function RegistroAsistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [botones, setBotones] = useState(false);
 
  const grupoActivo = cursoSeleccionado ? obtenerGrupo(cursoSeleccionado) : null;
  const alumnos = grupoActivo ? grupos[grupoActivo] : [];
 
  function manejarCambioCurso(evento) {
    setCursoSeleccionado(evento.target.value);
    setBotones(false);
  }
 
  function manejarRegistrar(evento) {
    evento.preventDefault();
    setBotones(true);
  }
 
  function manejarFinalizar(evento) {
    evento.preventDefault();
    alert('Clase finalizada con exito!');
    setBotones(false);
  }
 
  return (
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
                <select id="curso" className="form-select w-25 campo-formulario" value={cursoSeleccionado} onChange={manejarCambioCurso}>
                  <option value="" disabled>Seleccione</option>
                  <option value="1-medio">1° Medio</option>
                  <option value="2-medio">2° Medio</option>
                  <option value="3-medio">3° Medio</option>
                  <option value="4-medio">4° Medio</option>
                </select>
              </div>
 
              {grupoActivo && (
                <div id={`tabla-${grupoActivo.slice(-1)}`} className="table-responsive">
                  <table className="table mb-0 align-middle">
                    <thead className="encabezado-tabla">
                      <tr>
                        <th scope="col" style={{ width: '10%' }}>Número</th>
                        <th scope="col" style={{ width: '30%' }}>Nombres</th>
                        <th scope="col" style={{ width: '30%' }}>Apellidos</th>
                        <th scope="col" style={{ width: '30%' }}>Registro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alumnos.map((alumno) => (
                        <tr key={alumno.numero}>
                          <td>{alumno.numero}</td>
                          <td>{alumno.nombres}</td>
                          <td>{alumno.apellidos}</td>
                          <td>
                            <form className="d-flex gap-2 mb-0">
                              <input
                                type="radio"
                                className="btn-check botones presente"
                                name={`asistencia_${alumno.numero}`}
                                id={`presente_${grupoActivo}_${alumno.numero}`}
                                autoComplete="off"
                                disabled={!botones}
                              />
                              <label className="btn btn-outline-success btn-sm px-3" htmlFor={`presente_${grupoActivo}_${alumno.numero}`}>Presente</label>
 
                              <input
                                type="radio"
                                className="btn-check botones ausente"
                                name={`asistencia_${alumno.numero}`}
                                id={`ausente_${grupoActivo}_${alumno.numero}`}
                                autoComplete="off"
                                disabled={!botones}
                              />
                              <label className="btn btn-outline-danger btn-sm px-3" htmlFor={`ausente_${grupoActivo}_${alumno.numero}`}>Ausente</label>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
 
              {grupoActivo && (
                <div id="cont-botones">
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button type="submit" className="boton-calcular px-4 registrar" onClick={manejarRegistrar}>
                      Registrar asistencia
                    </button>
                    <button type="reset" className="btn btn-outline-secondary px-4 finalizar" onClick={manejarFinalizar}>
                      Finalizar clase
                    </button>
                  </div>
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
 
export default RegistroAsistencia;