import { useState } from 'react';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
 
function MiPerfil() {
  const [nombres, setNombres] = useState('Khan Zhaito');
  const [apellidos, setApellidos] = useState('Silva Perez');
  const [rut, setRut] = useState('98.765.432-1');
  const [nivel, setNivel] = useState('Educación Básica');
  const [telefono, setTelefono] = useState('912345678');
  const [correo, setCorreo] = useState('khan.zhaito@profesor.cl');
 
  const [editando, setEditando] = useState(false);
 
  function validarNombre() {
    return !(nombres.trim() === '' || nombres.trim().length < 3 || /\d/.test(nombres));
  }
 
  function validarApellidos() {
    return !(apellidos.trim() === '' || apellidos.trim().length < 3 || /\d/.test(apellidos));
  }
 
  function validarRut() {
    return !(rut.trim() === '' || !rut.includes('-') || rut.length <= 8 || rut.length > 13);
  }
 
  function validarTelefono() {
    return !(telefono.trim() === '' || telefono.length > 10 || /\D/.test(telefono));
  }
 
  function validarCorreo() {
    return !(correo.trim() === '' || !correo.includes('@') || !correo.includes('.'));
  }
 
  function manejarBoton(evento) {
    evento.preventDefault();
 
    if (!editando) {
      //aqui habilita los campos a editar
      setEditando(true);
      return;
    }
 
    //aqui valida los cambios antes de guardar
    if (!validarNombre()) {
      alert('Nombres no valido, revise los datos');
      return;
    }
    if (!validarApellidos()) {
      alert('Apellidos no valido, revise los datos');
      return;
    }
    if (!validarCorreo()) {
      alert('Correo no valido, revise los datos');
      return;
    }
    if (!validarTelefono()) {
      alert('Telefono no valido, revise los datos');
      return;
    }
    if (!validarRut()) {
      alert('Rut no valido, revise los datos');
      return;
    }
 
    alert('Datos modificados con exito!');
    setEditando(false);
  }
 
  return (
    <>
      <Header rol="Docente" claseEtiqueta="rol-docente" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <NavBar />
            <section className="col-md-10 py-4 px-4">
              <h1 className="mb-4">Mi perfil</h1>
              <h2 className="fs-6 mb-4">Consulta y actualiza tu información personal.</h2>
 
              <div className="caja-valor p-4">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="nombres" className="form-label fw-bold small">Nombres *</label>
                      <input
                        id="nombres"
                        type="text"
                        className="form-control form-control-sm campo-formulario"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="apellidos" className="form-label fw-bold small">Apellidos *</label>
                      <input
                        id="apellidos"
                        type="text"
                        className="form-control form-control-sm campo-formulario"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="rut" className="form-label fw-bold small">Rut *</label>
                      <input
                        id="rut"
                        type="text"
                        className="form-control form-control-sm campo-formulario"
                        placeholder="12.345.678-9"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="nivel" className="form-label fw-bold small">Nivel de enseñanza *</label>
                      <select
                        id="nivel"
                        className="form-select form-select-sm campo-formulario"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        disabled={!editando}
                      >
                        <option>Educación Básica</option>
                        <option>Educación Media</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="telefono" className="form-label fw-bold small">Teléfono *</label>
                      <input
                        id="telefono"
                        type="text"
                        className="form-control form-control-sm campo-formulario"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="correo_docente" className="form-label fw-bold small">Correo Electrónico *</label>
                      <input
                        id="correo_docente"
                        type="email"
                        className="form-control form-control-sm campo-formulario"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                  </div>
                  <div className="text-end">
                    <button id="btn-modificar" type="submit" className="btn btn-sm boton-calcular px-4" onClick={manejarBoton}>
                      {editando ? 'Aplicar' : 'Modificar'}
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
 
export default MiPerfil;