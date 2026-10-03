import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useState } from "react";
 
//array con cursos a eleccion cuando se vaya a registrar notas
const datosIniciales = {
  grupo1: [
    { numero: 1, nombre: 'Khan Zhaito', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 2, nombre: 'Mezako Susake', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 3, nombre: 'Tai Won', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
  ],
  grupo2: [
    { numero: 1, nombre: 'Juan Silva', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 2, nombre: 'John Doe', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 3, nombre: 'Jane Doe', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
  ],
  grupo3: [
    { numero: 1, nombre: 'Esteban Quito', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 2, nombre: 'Elena Nito', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
    { numero: 3, nombre: 'Solomeo Paredes', es1: '', es2: '', ef1: '', ef2: '', ed1: '', ed2: '', ed3: '', promedio: null },
  ],
};

function obtenerGrupo(curso) {
  if (curso === '1-medio' || curso === '4-medio') return 'grupo1';
  if (curso === '2-medio') return 'grupo2';
  return 'grupo3';
}
 
function RegistroNotas() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [datos, setDatos] = useState(datosIniciales);
  const [habilitado, setHabilitado] = useState(false);
 
  const grupoActivo = cursoSeleccionado ? obtenerGrupo(cursoSeleccionado) : null;
  const estudiantes = grupoActivo ? datos[grupoActivo] : [];
 
  function actualizarCampo(numero, campo, valor) {
    setDatos((actual) => ({
      ...actual,
      [grupoActivo]: actual[grupoActivo].map((est) =>
        est.numero === numero ? { ...est, [campo]: valor } : est
      ),
    }));
  }
 
  function calcularPromedios() {
    setDatos((actual) => ({
      ...actual,
      [grupoActivo]: actual[grupoActivo].map((est) => {
        const sumativa = (Number(est.es1) + Number(est.es2)) / 2;
        const formativa = (Number(est.ef1) + Number(est.ef2)) / 2;
        const desempeno = (Number(est.ed1) + Number(est.ed2) + Number(est.ed3)) / 3;
        const final = sumativa * 0.35 + formativa * 0.35 + desempeno * 0.3;
        return { ...est, promedio: final.toFixed(1) };
      }),
    }));
  }
 
  function manejarCambioCurso(evento) {
    setCursoSeleccionado(evento.target.value);
    setHabilitado(false);
  }
 
  function manejarRegistrar(evento) {
    evento.preventDefault();
    setHabilitado(true);
  }
 
  return (
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
                <select id="curso" className="form-select w-25 campo-formulario" value={cursoSeleccionado} onChange={manejarCambioCurso}>
                  <option value="" disabled>Seleccione</option>
                  <option value="1-medio">1° Medio</option>
                  <option value="2-medio">2° Medio</option>
                  <option value="3-medio">3° Medio</option>
                  <option value="4-medio">4° Medio</option>
                </select>
              </div>
 
              {grupoActivo && (
                <div id={`tabla-${grupoActivo.slice(-1)}`} className="table-responsive tabla">
                  <table className="table mb-0 text-center align-middle">
                    <thead className="encabezado-tabla">
                      <tr>
                        <th colSpan="2" className="border-end border-bottom-0"></th>
                        <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#1C2866' }}>Sumativa (35%)</th>
                        <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#283A94' }}>Formativa (35%)</th>
                        <th colSpan="3" className="border-end text-white" style={{ backgroundColor: '#334ABD' }}>Desempeño (30%)</th>
                        <th className="border-bottom-0"></th>
                      </tr>
                      <tr>
                        <th className="border-end" style={{ width: '5%' }}>Número</th>
                        <th className="border-end text-start" style={{ width: '20%' }}>Estudiante</th>
                        <th style={{ width: '8%' }}>ES1</th>
                        <th className="border-end" style={{ width: '8%' }}>ES2</th>
                        <th style={{ width: '8%' }}>EF1</th>
                        <th className="border-end" style={{ width: '8%' }}>EF2</th>
                        <th style={{ width: '8%' }}>ED1</th>
                        <th style={{ width: '8%' }}>ED2</th>
                        <th className="border-end" style={{ width: '8%' }}>ED3</th>
                        <th>Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estudiantes.map((est) => (
                        <tr key={est.numero}>
                          <td className="border-end">{est.numero}</td>
                          <td className="border-end text-start">{est.nombre}</td>
                          {['es1', 'es2', 'ef1', 'ef2', 'ed1', 'ed2', 'ed3'].map((campo) => (
                            <td key={campo} className={['es2', 'ef2', 'ed3'].includes(campo) ? 'border-end' : undefined}>
                              <input
                                type="text"
                                className={`form-control form-control-sm text-center px-1 campo-formulario ${campo}`}
                                placeholder="Ej: 7.0"
                                value={est[campo]}
                                onChange={(e) => actualizarCampo(est.numero, campo, e.target.value)}
                                disabled={!habilitado}
                              />
                            </td>
                          ))}
                          <td className="fw-bold monto-valor promedio">{est.promedio ?? ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
 
              {grupoActivo && (
                <div id="cont-botones">
                  <div className="d-flex justify-content-end gap-3 mt-4">
                    <button
                      id="btn-calcular"
                      className="btn btn-outline-secondary px-4"
                      onClick={calcularPromedios}
                      disabled={!habilitado}
                    >
                      Calcular
                    </button>
                    <button id="btn-registrar" className="boton-calcular px-4" onClick={manejarRegistrar}>
                      Registrar
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
 
export default RegistroNotas;