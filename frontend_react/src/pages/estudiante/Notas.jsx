import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
 
function Notas() {
  return (
    <>
      <Header rol="Estudiante" claseEtiqueta="rol-estudiante" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <Navbar />
            <section className="col-md-10 py-4 px-4 seccion-notas">
              <h1 className="titulo-principal mb-4">Mis Notas</h1>
              <h2 className="fs-6 mb-4">Revisa tus calificaciones y conoce tu rendimiento académico.</h2>
 
              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
                    <i className="bx bx-note-book fs-1 text-primary me-4"></i>
                    <div className="text-start">
                      <span className="d-block fs-3 fw-bold monto-valor">3</span>
                      <span className="etiqueta-valor small">Asignaturas</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
                    <i className="bx bx-medal fs-1 text-warning me-4"></i>
                    <div className="text-start">
                      <span className="d-block fs-3 fw-bold monto-valor">6.5</span>
                      <span className="etiqueta-valor small">Promedio General</span>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="table-responsive contenedor-tabla">
                <table className="table table-bordered text-center align-middle tabla-horarios bg-white">
                  <thead className="encabezado-tabla">
                    <tr>
                      <th colSpan="1" className="border-0"></th>
                      <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#1C2866' }}>Sumativa (35%)</th>
                      <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#283A94' }}>Formativa (35%)</th>
                      <th colSpan="3" className="border-end text-white" style={{ backgroundColor: '#334ABD' }}>Desempeño (30%)</th>
                      <th colSpan="1" className="border-0"></th>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#283A94', color: 'white' }} className="border-end">Asignatura</th>
                      <th style={{ width: '8%' }}>ES1</th>
                      <th className="border-end" style={{ width: '8%' }}>ES2</th>
                      <th style={{ width: '8%' }}>EF1</th>
                      <th className="border-end" style={{ width: '8%' }}>EF2</th>
                      <th style={{ width: '8%' }}>ED1</th>
                      <th style={{ width: '8%' }}>ED2</th>
                      <th className="border-end" style={{ width: '8%' }}>ED3</th>
                      <th className="table-secondary fw-bold">Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="fila-horario">
                      <td className="celda-asignatura fw-bold text-start text-white border-end" style={{ backgroundColor: '#283A94' }}>Estadistica</td>
                      <td>6.7</td>
                      <td className="border-end">6.5</td>
                      <td>6.2</td>
                      <td className="border-end">6.8</td>
                      <td>7.0</td>
                      <td>6.5</td>
                      <td className="border-end">5.8</td>
                      <td className="fw-bold table-secondary">6.5</td>
                    </tr>
                    <tr className="fila-horario">
                      <td className="celda-asignatura fw-bold text-start text-white border-end" style={{ backgroundColor: '#283A94' }}>Base de Datos</td>
                      <td>6.7</td>
                      <td className="border-end">6.5</td>
                      <td>6.2</td>
                      <td className="border-end">6.8</td>
                      <td>7.0</td>
                      <td>6.5</td>
                      <td className="border-end">5.8</td>
                      <td className="fw-bold table-secondary">6.5</td>
                    </tr>
                    <tr className="fila-horario">
                      <td className="celda-asignatura fw-bold text-start text-white border-end" style={{ backgroundColor: '#283A94' }}>Desarrollo FullStack II</td>
                      <td>6.7</td>
                      <td className="border-end">6.5</td>
                      <td>6.2</td>
                      <td className="border-end">6.8</td>
                      <td>7.0</td>
                      <td>6.5</td>
                      <td className="border-end">5.8</td>
                      <td className="fw-bold table-secondary">6.5</td>
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
 
export default Notas;