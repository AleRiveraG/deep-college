import { useState } from 'react';
import Header from '../../components/Header';
import SidebarDirectiva from '../../components/SidebarDirectiva';
import Footer from '../../components/Footer';
 
const cursos = [
  { id: 'curso-1ro-basico', nombre: '1° Básico', totalClases: 30, porcentaje: 90 },
  { id: 'curso-2do-basico', nombre: '2° Básico', totalClases: 30, porcentaje: 90 },
  { id: 'curso-3ro-basico', nombre: '3° Básico', totalClases: 30, porcentaje: 87 },
  { id: 'curso-4to-basico', nombre: '4° Básico', totalClases: 30, porcentaje: 90 },
  { id: 'curso-5to-basico', nombre: '5° Básico', totalClases: 30, porcentaje: 95 },
  { id: 'curso-6to-basico', nombre: '6° Básico', totalClases: 30, porcentaje: 85 },
  { id: 'curso-7mo-basico', nombre: '7° Básico', totalClases: 30, porcentaje: 90 },
  { id: 'curso-8vo-basico', nombre: '8° Básico', totalClases: 30, porcentaje: 92 },
  { id: 'curso-1ro-medio', nombre: '1° Medio', totalClases: 30, porcentaje: 92 },
  { id: 'curso-2do-medio', nombre: '2° Medio', totalClases: 30, porcentaje: 90 },
  { id: 'curso-3ro-medio', nombre: '3° Medio', totalClases: 30, porcentaje: 96 },
  { id: 'curso-4to-medio', nombre: '4° Medio', totalClases: 30, porcentaje: 80 },
];
 
function RegistroAsistencia() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
 
  const curso = cursos.find((c) => c.id === `curso-${cursoSeleccionado}`);
 
  return (
    <>
      <Header rol="Directiva" claseEtiqueta="etiqueta-directiva" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <SidebarDirectiva />
            <section className="col-md-10 py-5 px-4 px-md-5 fondo-panel">
 
              <div className="tarjeta-blanca p-4 p-md-5 mb-5 border rounded">
                <h1 className="titulo-principal mb-2">Registro de asistencia</h1>
                <h2 className="fs-6 texto-secundario mb-4">Consulta la asistencia de forma general por cada curso.</h2>
 
                <div className="p-4 caja-valor border rounded">
                  <label htmlFor="curso" className="form-label fw-bold small">Seleccione curso</label>
                  <select
                    id="curso"
                    className="form-select campo-formulario w-100 w-md-25"
                    value={cursoSeleccionado}
                    onChange={(e) => setCursoSeleccionado(e.target.value)}
                  >
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
 
              {curso && (
                <div className="resumenes row m-0">
                  <h3 className="mb-4 subtitulo">Detalle por curso</h3>
 
                  <div className="col-12 mb-4">
                    <div className="p-4 p-md-5 tarjeta-blanca border rounded caja-valor w-100">
                      <h4 className="fs-4 mb-4 fw-bold">Curso: {curso.nombre}</h4>
                      <label htmlFor="asistencia-global"></label>
                      <progress
                        id="asistencia-global"
                        max="100"
                        value={curso.porcentaje}
                        className="w-100 mb-4"
                        style={{ height: '20px' }}
                      ></progress>
                      <div className="d-flex justify-content-around text-center">
                        <div>
                          <span className="d-block fs-3 fw-bold monto-valor">{curso.totalClases}</span>
                          <span className="etiqueta-valor small texto-secundario">Total clases</span>
                        </div>
                        <div>
                          <span className="d-block fs-3 fw-bold monto-resultado">{curso.porcentaje}%</span>
                          <span className="etiqueta-valor small texto-secundario">Asistencia global</span>
                        </div>
                      </div>
                    </div>
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