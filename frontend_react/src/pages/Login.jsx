import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/Boton';
import MensajeError from '../components/MensajeError';
 
function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  function validarCorreo(correo) {
    return !(correo.trim() === '' || !correo.includes('@') || !correo.includes('.'));
  }
 
  function validarContrasena(contrasena) {
    return !(contrasena.trim() === '' || contrasena.trim().length < 8);
  }
 
  function buscarRol(correo) {
    let dominio = correo.split('@')[1];
    let rol = dominio.split('.')[0];
    let colegio = dominio.split('.')[1];
    if (colegio === 'deepcollege') {
      return rol;
    } else {
      return null;
    }
  }
 
  function manejarInicioSesion(evento) {
    evento.preventDefault();
    setError('');
 
    if (!validarCorreo(correo) || buscarRol(correo) == null) {
      setError('Correo ingresado no valido, compruebe los datos');
      return;
    }
 
    if (!validarContrasena(contrasena)) {
      setError('Contraseña no valida, ingrese nuevamente');
      return;
    }
 
    let rol = buscarRol(correo);
 
    if (rol === 'directiva') {
      alert('Inicio de sesión exitoso!');
      navigate('/directiva');
    } else if (rol === 'docente') {
      alert('Inicio de sesión exitoso!');
      navigate('/docente');
    } else if (rol === 'estudiante') {
      alert('Inicio de sesión exitoso!');
      navigate('/estudiante');
    } else if (rol === 'apoderado'){
      alert('Inicio de sesión exitoso!')
      navigate('/apoderado')
    }else{
      setError('Correo no valido');
    }
  }
 
  return (
    <>
      <div>
        <video autoPlay muted loop className="fondo-login">
          <source src="/images/library.mp4" />
        </video>
      </div>
 
      <div className="container-fluid p-0">
        <div className="row m-0 min-vh-100 py-4 justify-content-center align-items-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
            <div className="fondo-formulario p-4 border rounded">
              <div className="text-center mb-4">
                <img src="/images/logo deep.png" className="logo mb-3" alt="Logo Deep College" />
                <h1 className="fw-bold fs-3 mb-2">Iniciar Sesión</h1>
              </div>
              <form onSubmit={manejarInicioSesion}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold">Correo Electrónico</label>
                  <input
                    id="correo"
                    type="email"
                    className="form-control campo-formulario"
                    placeholder="Ingrese su correo electrónico"
                    value={correo}
                    onChange={(e) => { setCorreo(e.target.value); setError(''); }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contrasena" className="form-label fw-bold">Contraseña</label>
                  <input
                    id="contrasena"
                    type="password"
                    className="form-control campo-formulario"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => { setContrasena(e.target.value); setError(''); }}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div className="form-check m-0">
                    <input id="recuerdame" type="checkbox" className="form-check-input check-institucional" />
                    <label htmlFor="recuerdame" className="form-check-label texto-secundario">Recuérdame</label>
                  </div>
                  <a href="#" className="fw-bold enlace-olvido">¿Olvidó su contraseña?</a>
                </div>
                <MensajeError error={error} />
                <div className="d-grid mt-2">
                  <Boton id="btn-iniciar" tipo="submit" clase="btn boton-calcular py-2 fs-5" texto="Iniciar Sesión" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Login;