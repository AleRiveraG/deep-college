function Inicio() {
  return (
    <>
      <header className="py-3 px-4 px-md-5">
        <nav className="d-flex justify-content-between align-items-center encabezado-principal">
          <a href="#inicio" className="d-flex align-items-center text-decoration-none fs-4 fw-bold">
            <img src="/images/logo-deep-white.png" height="50" className="me-3" alt="Logo colegio" />
          </a>
 
          <ul className="d-flex gap-5 list-unstyled m-0 p-0 lista-enlaces">
            <li><a href="#inicio" className="text-decoration-none fw-semibold">Inicio</a></li>
            <li><a href="#biografia" className="text-decoration-none fw-semibold">Nosotros</a></li>
            <li><a href="#mision" className="text-decoration-none fw-semibold">Misión</a></li>
            <li><a href="#vision" className="text-decoration-none fw-semibold">Visión</a></li>
          </ul>
 
          <a href="/login" className="btn d-flex align-items-center boton-ingresar">
            <i className="bx bx-log-in fs-5 me-2"></i> Ingresar
          </a>
        </nav>
      </header>
 
      <main className="contenido-principal">
 
        <section id="inicio" className="container-fluid px-4 px-md-5 py-5 seccion-inicio">
          <div className="row align-items-center fila-inicio">
            <div className="col-md-6 pe-md-5 contenedor-texto-inicio">
              <span className="badge px-3 py-2 mb-3 fs-6 etiqueta-destacada">Más de 30 años formando líderes</span>
 
              <h1 className="display-4 fw-bold mb-4 titulo-principal">Deep College</h1>
 
              <p className="fs-5 mb-4 parrafo-principal">Una institución educativa comprometida con la excelencia académica, la formación en valores y el desarrollo integral de cada estudiante desde 1993.</p>
 
              <div className="d-flex gap-3 contenedor-botones">
                <a href="/postulacion" className="btn btn-lg d-flex align-items-center boton-postular">
                  <i className="bx bx-edit me-2"></i>Postula aquí
                </a>
                <a href="#biografia" className="btn btn-lg d-flex align-items-center boton-conocer">
                  <i className="bx bx-group me-2"></i> Conócenos
                </a>
              </div>
            </div>
 
            <div className="col-md-6 mt-5 mt-md-0 text-center contenedor-imagen-inicio">
              <img src="/images/logo deep.png" alt="colegio" className="img-fluid rounded imagen-colegio" />
            </div>
          </div>
        </section>
 
        <section id="biografia" className="container-fluid px-4 px-md-5 py-5 seccion-biografia">
          <div className="row align-items-center fila-biografia">
            <div className="col-md-5 mb-5 mb-md-0 text-center contenedor-imagen-biografia">
              <img src="/images/college.jpg" alt="Historia del colegio" className="img-fluid rounded imagen-historia" />
            </div>
 
            <div className="col-md-7 ps-md-5 contenedor-texto-biografia">
              <h2 className="display-6 fw-bold mb-4 subtitulo-historia">Nuestra Historia</h2>
              <p className="fs-5 fw-semibold mb-3 lema-historia">Acompañando a las familias en la educación integral de sus hijos.</p>
              <p className="mb-3 parrafo-historia">En Deep College creemos que la educación va mucho más allá de las aulas. Nacimos con la vocación de crear un espacio donde la excelencia académica conviva con el desarrollo humano y emocional.</p>
              <p className="mb-4 parrafo-historia">Contamos con un equipo de profesionales apasionados que guían a cada alumno para que descubra su verdadero potencial y se convierta en un aporte positivo para la sociedad.</p>
            </div>
          </div>
        </section>
 
        <section id="mision" className="container-fluid px-4 px-md-5 py-5 seccion-biografia">
          <div className="row align-items-center fila-biografia">
            <div className="col-md-7 ps-md-5 contenedor-texto-biografia">
              <h2 className="display-6 fw-bold mb-4 subtitulo-historia">Nuestra Misión</h2>
              <h3 className="fs-5 fw-semibold mb-3 lema-historia">Formamos personas que dejan huella</h3>
              <p className="mb-3 parrafo-historia">En Deep College creemos que la educación es mucho más que adquirir conocimientos: es descubrir talentos, desarrollar valores y aprender a enfrentar los desafíos de la vida con confianza y perseverancia. Nuestra misión es acompañar a cada estudiante en su crecimiento integral, entregándole las herramientas, oportunidades y experiencias necesarias para alcanzar su máximo potencial.</p>
              <p className="mb-4 parrafo-historia">Buscamos formar personas íntegras, creativas y comprometidas, capaces de construir su propio futuro y contribuir positivamente a la sociedad.</p>
            </div>
            <div className="col-md-5 mb-5 mb-md-0 text-center contenedor-imagen-biografia">
              <img src="/images/students.jpeg" alt="Misión del colegio" className="img-fluid rounded imagen-historia" />
            </div>
          </div>
        </section>
 
        <section id="vision" className="container-fluid px-4 px-md-5 py-5 seccion-biografia">
          <div className="row align-items-center fila-biografia">
            <div className="col-md-5 mb-5 mb-md-0 text-center contenedor-imagen-biografia">
              <img src="/images/students_running.jpeg" alt="Visión del colegio" className="img-fluid rounded imagen-historia" />
            </div>
 
            <div className="col-md-7 ps-md-5 contenedor-texto-biografia">
              <h2 className="display-6 fw-bold mb-4 subtitulo-historia">Nuestra Visión</h2>
              <p className="fs-5 fw-semibold mb-3 lema-historia">Inspiramos hoy para transformar el mañana</p>
              <p className="mb-3 parrafo-historia">En Deep College aspiramos a ser una comunidad educativa que inspire a nuestros estudiantes a soñar en grande, descubrir sus capacidades y convertirse en protagonistas de su propio futuro. Queremos construir un espacio donde el aprendizaje, la creatividad, el respeto y la colaboración sean pilares fundamentales, preparando a cada estudiante no solo para alcanzar sus metas, sino también para enfrentar los desafíos del mundo con una mirada crítica, humana e innovadora.</p>
              <p className="mb-4 parrafo-historia">Creemos en una educación que trasciende las aulas y deja una huella positiva en cada persona y en la sociedad.</p>
            </div>
          </div>
        </section>
      </main>
 
      <footer className="container-fluid py-5 contenedor-pie">
        <div className="row">
          <div className="col-md-6 px-5 mb-4 mb-md-0">
            <img src="/images/logo-deep-white.png" className="logo mb-3" alt="Logo Colegio" />
            <p>Formando líderes desde 1993. Educación de calidad y excelencia académica</p>
            <hr />
            <div className="d-flex mt-3">
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/Instagram_Glyph_White.png" alt="Logotipo Instagram" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/Facebook_Logo_Secondary.png" alt="Logotipo Facebook" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/logo-white.png" alt="Logotipo X" />
              </a>
              <a href="#" className="me-3">
                <img className="logos-enlaces" src="/images/InBug-White.png" alt="Logotipo LinkedIn" />
              </a>
            </div>
          </div>
          <div className="col-md-6 px-5">
            <ul className="list-unstyled">
              <li className="mb-4">
                <span className="fs-5 fw-bold">Contacto</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bx bx-location fs-5 me-2 icono-ubicacion"></i>
                Av. Ubicación 123
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bx bx-phone fs-5 me-2 icono-telefono"></i>
                +56 9 9876 5432
              </li>
              <li className="d-flex align-items-center">
                <i className="bx bx-envelope fs-5 me-2 icono-correo"></i>
                correo.ejemplo@colegio.cl
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
 
export default Inicio;