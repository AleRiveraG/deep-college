import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
function Postulacion() {
  const [nombrePostulante, setNombrePostulante] = useState('');
  const [rutPostulante, setRutPostulante] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [curso, setCurso] = useState('');
  const [nombreApoderado, setNombreApoderado] = useState('');
  const [rutApoderado, setRutApoderado] = useState('');
  const [correoApoderado, setCorreoApoderado] = useState('');
  const [telefonoApoderado, setTelefonoApoderado] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [observaciones, setObservaciones] = useState('');
 
  const navigate = useNavigate();
 
  function validarNombre(nombre) {
    return !(nombre.trim() === '' || nombre.trim().length < 3 || /\d/.test(nombre));
  }
 
  function validarRut(rut) {
    return !(rut.trim() === '' || rut.trim().length < 8 || !rut.includes('-'));
  }
 
  function validarFecha(fecha) {
    return fecha.trim() !== '';
  }
 
  function validarCurso(curso) {
    return curso.trim() !== '';
  }
 
  function validarCorreo(correo) {
    return !(correo.trim() === '' || !correo.includes('@') || !correo.includes('.'));
  }
 
  function validarTelefono(telefono) {
    return !(telefono.trim() === '' || telefono.trim().length < 8);
  }
 
  function manejarPostulacion(evento) {
    evento.preventDefault();
 
    if (!validarNombre(nombrePostulante)) {
      alert('Nombre del postulante no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarRut(rutPostulante)) {
      alert('Rut del postulante no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarFecha(fechaNacimiento)) {
      alert('Debe ingresar la fecha de nacimiento del postulante');
      return;
    }
    if (!validarCurso(curso)) {
      alert('Debe seleccionar el curso al que postula');
      return;
    }
    if (!validarNombre(nombreApoderado)) {
      alert('Nombre del apoderado no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarRut(rutApoderado)) {
      alert('Rut del apoderado no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarCorreo(correoApoderado)) {
      alert('Correo de contacto no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarTelefono(telefonoApoderado)) {
      alert('Teléfono de contacto no valido, compruebe los datos ingresados');
      return;
    }
    if (!terminos) {
      alert('Debe autorizar el uso de los datos para continuar con la postulación');
      return;
    }
 
    alert('Postulación enviada con éxito! Nos pondremos en contacto contigo pronto');
    // Antes: window.location.href = 'index.html'; ahora: navigate a la landing
    navigate('/');
  }
 
  return (
    <>
      <header className="py-3 px-4 px-md-5">
        <nav className="d-flex justify-content-between align-items-center navegacion-superior">
          <a href="/" className="d-flex align-items-center text-decoration-none fs-4 fw-bold">
            <i className="bx bxs-graduation fs-2 me-2"></i>
          </a>
 
          <ul className="d-flex gap-4 list-unstyled m-0 p-0 lista-enlaces">
            <li><a href="/#inicio" className="text-decoration-none fw-semibold">Inicio</a></li>
            <li><a href="/#biografia" className="text-decoration-none fw-semibold">Nosotros</a></li>
            <li><a href="/#mision" className="text-decoration-none fw-semibold">Misión</a></li>
            <li><a href="/#vision" className="text-decoration-none fw-semibold">Visión</a></li>
          </ul>
 
          <a href="/login" className="btn d-flex align-items-center boton-ingresar">
            <i className="bx bx-log-in fs-5 me-2"></i> Ingresar
          </a>
        </nav>
      </header>
 
      <main className="contenido-principal">
        <section id="postulacion" className="container-fluid px-4 px-md-5 py-5 seccion-biografia">
          <div className="row justify-content-center">
            <div className="col-lg-9">
 
              <div className="text-center mb-5">
                <span className="badge px-3 py-2 mb-3 fs-6 etiqueta-destacada">Admisión 2027</span>
                <h1 className="display-6 fw-bold mb-3 subtitulo-historia">Postula a Deep College</h1>
                <p className="fs-5 parrafo-historia">Completa el siguiente formulario con los datos del postulante y del apoderado. Nuestro equipo de admisión se pondrá en contacto contigo a la brevedad.</p>
              </div>
 
              <form className="p-4 p-md-5 border rounded caja-valor" onSubmit={manejarPostulacion}>
 
                <h2 className="fs-5 fw-bold mb-4">Datos del postulante</h2>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre-postulante" className="form-label fw-bold">Nombre completo *</label>
                    <input
                      id="nombre-postulante"
                      type="text"
                      className="form-control campo-formulario"
                      placeholder="Nombre y apellidos del postulante"
                      value={nombrePostulante}
                      onChange={(e) => setNombrePostulante(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <label htmlFor="rut-postulante" className="form-label fw-bold">Rut del postulante *</label>
                    <input
                      id="rut-postulante"
                      type="text"
                      className="form-control campo-formulario"
                      placeholder="12.345.678-9"
                      value={rutPostulante}
                      onChange={(e) => setRutPostulante(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="fecha-nacimiento" className="form-label fw-bold">Fecha de nacimiento *</label>
                    <input
                      id="fecha-nacimiento"
                      type="date"
                      className="form-control campo-formulario"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <label htmlFor="curso-postula" className="form-label fw-bold">Curso al que postula *</label>
                    <select
                      id="curso-postula"
                      className="form-select campo-formulario"
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                    >
                      <option value="" disabled>Seleccione un curso</option>
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
                </div>
 
                <hr className="my-4" style={{ borderColor: '#d0d0d0' }} />
 
                <h2 className="fs-5 fw-bold mb-4">Datos del apoderado</h2>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre-apoderado" className="form-label fw-bold">Nombre completo *</label>
                    <input
                      id="nombre-apoderado"
                      type="text"
                      className="form-control campo-formulario"
                      placeholder="Nombre y apellidos del apoderado"
                      value={nombreApoderado}
                      onChange={(e) => setNombreApoderado(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <label htmlFor="rut-apoderado" className="form-label fw-bold">Rut del apoderado *</label>
                    <input
                      id="rut-apoderado"
                      type="text"
                      className="form-control campo-formulario"
                      placeholder="12.345.678-9"
                      value={rutApoderado}
                      onChange={(e) => setRutApoderado(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="correo-apoderado" className="form-label fw-bold">Correo de contacto *</label>
                    <input
                      id="correo-apoderado"
                      type="email"
                      className="form-control campo-formulario"
                      placeholder="ejemplo@correo.cl"
                      value={correoApoderado}
                      onChange={(e) => setCorreoApoderado(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mt-3 mt-md-0">
                    <label htmlFor="telefono-apoderado" className="form-label fw-bold">Teléfono de contacto *</label>
                    <input
                      id="telefono-apoderado"
                      type="text"
                      className="form-control campo-formulario"
                      placeholder="+56 9 1234 5678"
                      value={telefonoApoderado}
                      onChange={(e) => setTelefonoApoderado(e.target.value)}
                    />
                  </div>
                </div>
 
                <div className="mb-4">
                  <label htmlFor="observaciones" className="form-label fw-bold">Observaciones</label>
                  <textarea
                    id="observaciones"
                    className="form-control campo-formulario"
                    rows="3"
                    placeholder="Información adicional que quieras compartir (opcional)"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  ></textarea>
                </div>
 
                <div className="form-check mb-4">
                  <input
                    id="terminos-postulacion"
                    type="checkbox"
                    className="form-check-input check-institucional"
                    checked={terminos}
                    onChange={(e) => setTerminos(e.target.checked)}
                  />
                  <label htmlFor="terminos-postulacion" className="form-check-label">Autorizo el uso de estos datos para el proceso de admisión</label>
                </div>
 
                <div className="text-center">
                  <button id="btn-postular" type="submit" className="btn boton-calcular px-5 py-2 fs-5">Enviar postulación</button>
                </div>
 
              </form>
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
 
export default Postulacion;