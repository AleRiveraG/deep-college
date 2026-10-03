import { useState } from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
 
const cursos = [
  { id: '1-basico', nombre: '1° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '2-basico', nombre: '2° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '3-basico', nombre: '3° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '4-basico', nombre: '4° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '5-basico', nombre: '5° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '6-basico', nombre: '6° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '7-basico', nombre: '7° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '8-basico', nombre: '8° Básico', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '1-medio', nombre: '1° Medio', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '2-medio', nombre: '2° Medio', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '3-medio', nombre: '3° Medio', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
  { id: '4-medio', nombre: '4° Medio', promedio: 5.8, totalAlumnos: 30, sobre4: 20, bajo4: 10 },
];
 
function RegistroNotas() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
 
  const curso = cursos.find((c) => c.id === cursoSeleccionado);
 
  return (
    <>
      <Header rol="Directiva" claseEtiqueta="etiqueta-directiva" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <NavBar />
            <section className="col-md-10 py-4 px-4">
              <h1 className="mb-4">Registro de notas</h1>
              <h2 className="fs-6 mb-4">Consulta las calificaciones generales de cada curso.</h2>
 
              <div className="p-4 mb-5 caja-valor">
                <label htmlFor="curso" className="form-label fw-bold small">Seleccione un curso:</label>
                <select
                  id="curso"
                  className="form-select campo-formulario w-25"
                  value={cursoSeleccionado}
                  onChange={(e) => setCursoSeleccionado(e.target.value)}
                >
                  <option value="1-basico">1° Básico</option>
                  <option value="2-basico">2° Básico</option>
                  <option value="3-basico">3° Básico</option>
                  <option value="4-basico">4° Básico</option>
                  <option value="5-basico">5° Básico</option>
                  <option value="6-basico">6° Básico</option>
                  <option value="7-basico">7° Básico</option>
                  <option value="8-basico">8° Básico</option>
                  <option value="1-medio">1° Medio</option>
                  <option value="2-medio">2° Medio</option>
                  <option value="3-medio">3° Medio</option>
                  <option value="4-medio">4° Medio</option>
                </select>
              </div>
 
              {curso && (
                <div className="resumenes row m-0">
                  <div className="col-12 mb-4 p-0">
                    <div className="p-4 caja-valor">
                      <h2 className="fs-5 mb-3">Curso: {curso.nombre}</h2>
                      <label htmlFor="promedio" className="form-label fw-bold small">Promedio de notas</label>
                      <progress id="promedio" max="7" value={curso.promedio} className="w-100 mb-4"></progress>
                      <div className="d-flex justify-content-around text-center">
                        <div>
                          <span className="d-block fs-3 fw-bold monto-valor">{curso.totalAlumnos}</span>
                          <span>Total alumnos</span>
                        </div>
                        <div>
                          <span className="d-block fs-3 fw-bold monto-valor">{curso.sobre4}</span>
                          <span>Alumnos sobre nota 4.0</span>
                        </div>
                        <div>
                          <span className="d-block fs-3 fw-bold monto-negativo">{curso.bajo4}</span>
                          <span>Alumnos bajo nota 4.0</span>
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
 
export default RegistroNotas;