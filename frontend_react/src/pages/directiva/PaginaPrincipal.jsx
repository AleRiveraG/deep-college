import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SidebarDirectiva from '../../components/SidebarDirectiva';
import Footer from '../../components/Footer';
 
function PaginaPrincipal() {
  // Antes (script.js): manipulaba directamente el texto de #fecha con document.querySelector
  // Ahora: se guarda en estado y se muestra con {fecha} en el JSX
  const [fecha, setFecha] = useState('');
 
  useEffect(() => {
    const fechaHoy = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setFecha(fechaHoy.toLocaleDateString('es-ES', options));
  }, []); // el array vacío [] significa: ejecútalo solo una vez, al cargar la página
 
  return (
    <>
      <Header rol="Directiva" claseEtiqueta="etiqueta-directiva" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <SidebarDirectiva />
            <section className="col-md-10 py-5 px-4 px-md-5 fondo-panel">
 
              <div className="row align-items-center mb-4">
                <h1 className="titulo-principal mb-2 col-md-6">Bienvenido/a</h1>
                <h2 className="fs-6 texto-secundario mb-4 col-md-6 text-end">{fecha}</h2>
              </div>
 
              <div className="tarjeta-blanca p-4 p-md-5 mb-5 border rounded">
                <p className="fs-4 fw-bold texto-destacado mb-0 text-center">¿Qué deseas hacer el día de hoy?</p>
              </div>
 
              <div className="avisos-contenedor">
                <h3 className="subtitulo mb-4">
                  <i className="bx bx-news me-2 icono-eventos"></i> Avisos y noticias
                </h3>
 
                <div className="p-4 caja-valor mb-3 border rounded">
                  <h4 className="fs-5 fw-bold">Deep College obtiene primer lugar en torneo de fútbol escolar</h4>
                  <p className="mb-0">El equipo de fútbol de Deep College consiguió el primer lugar en el Campeonato Interescolar 2026 luego de imponerse en la final disputada durante el fin de semana.</p>
                </div>
 
                <div className="p-4 caja-valor mb-3 border rounded">
                  <h4 className="fs-5 fw-bold">Reconocimiento a estudiantes destacados del primer semestre</h4>
                  <p className="mb-0">Deep College realizó una ceremonia de reconocimiento para estudiantes que destacaron durante el primer semestre por su rendimiento académico, participación en actividades y compromiso con la comunidad escolar.</p>
                </div>
 
                <div className="p-4 caja-valor mb-3 border rounded">
                  <h4 className="fs-5 fw-bold">Semana de la Tecnología llega a Deep College</h4>
                  <p className="mb-0">Durante la próxima semana se realizarán distintas actividades relacionadas con programación, robótica, inteligencia artificial y tecnología. Las actividades estarán dirigidas a estudiantes de distintos niveles.</p>
                </div>
              </div>
 
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
 
export default PaginaPrincipal;