import { useState } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
 
function MiPerfil() {
  const [primerNombre, setPrimerNombre] = useState('Alberto');
  const [segundoNombre, setSegundoNombre] = useState('Khan');
  const [primerApellido, setPrimerApellido] = useState('Zhaito');
  const [segundoApellido, setSegundoApellido] = useState('Gonzalez');
  const [rut, setRut] = useState('12345678-9');
  const [fechaNacimiento, setFechaNacimiento] = useState('2026-09-02');
 
  const [editando, setEditando] = useState(false);
 
  function validarPrimerNombre() {
    return !(primerNombre.trim() === '' || primerNombre.trim().length < 3 || /\d/.test(primerNombre));
  }
 
  function validarSegundoNombre() {
    return !(segundoNombre.trim().length < 3 || /\d/.test(segundoNombre));
  }
 
  function validarPrimerApellido() {
    return !(primerApellido.trim() === '' || primerApellido.trim().length < 3 || /\d/.test(primerApellido));
  }
 
  function validarSegundoApellido() {
    return !(segundoApellido.trim() === '' || segundoApellido.trim().length < 3 || /\d/.test(segundoApellido));
  }
 
  function validarFechaNacimiento() {
    return fechaNacimiento !== '';
  }
 
  function validarRut() {
    return !(rut.trim() === '' || rut.trim().length < 8 || !rut.includes('-') || rut.trim().length > 13);
  }
 
  function manejarBoton(evento) {
    evento.preventDefault();
 
    if (!editando) {
      setEditando(true);
      return;
    }
 
    if (!validarPrimerNombre()) {
      alert('Primer nombre no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarSegundoNombre()) {
      alert('Segundo nombre no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarPrimerApellido()) {
      alert('Primer apellido no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarSegundoApellido()) {
      alert('Segundo apellido no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarRut()) {
      alert('Rut no valido, compruebe los datos ingresados');
      return;
    }
    if (!validarFechaNacimiento()) {
      alert('Fecha ingresada no valida, compruebe los datos ingresados');
      return;
    }
 
    alert('Datos modificados con exito!');
    setEditando(false);
  }
 
  return (
    <>
      <Header rol="Estudiante" claseEtiqueta="rol-estudiante" />
      <main>
        <div className="container-fluid p-0">
          <div className="row m-0">
            <Navbar />
            <section className="col-md-10 py-4 px-4 seccion-perfil">
              <h1 className="titulo-principal mb-4">Mi perfil</h1>
              <h2 className="fs-6 mb-4">Consulta y actualiza tu informacion personal.</h2>
 
              <div className="border rounded p-4 caja-valor bg-light">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="primer-nombre" className="form-label etiqueta-input fw-bold small">Primer Nombre *</label>
                      <input
                        id="primer-nombre"
                        className="form-control form-control-sm campo-formulario"
                        value={primerNombre}
                        onChange={(e) => setPrimerNombre(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="segundo-nombre" className="form-label etiqueta-input fw-bold small">Segundo Nombre *</label>
                      <input
                        id="segundo-nombre"
                        className="form-control form-control-sm campo-formulario"
                        value={segundoNombre}
                        onChange={(e) => setSegundoNombre(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="primer-apellido" className="form-label etiqueta-input fw-bold small">Primer Apellido *</label>
                      <input
                        id="primer-apellido"
                        className="form-control form-control-sm campo-formulario"
                        value={primerApellido}
                        onChange={(e) => setPrimerApellido(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="segundo-apellido" className="form-label etiqueta-input fw-bold small">Segundo Apellido *</label>
                      <input
                        id="segundo-apellido"
                        className="form-control form-control-sm campo-formulario"
                        value={segundoApellido}
                        onChange={(e) => setSegundoApellido(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label htmlFor="rut" className="form-label etiqueta-input fw-bold small">Rut *</label>
                      <input
                        id="rut"
                        className="form-control form-control-sm campo-formulario"
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        disabled={!editando}
                      />
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                      <label htmlFor="fecha-nacimiento" className="form-label etiqueta-input fw-bold small">Fecha de Nacimiento *</label>
                      <input
                        id="fecha-nacimiento"
                        type="date"
                        className="form-control form-control-sm campo-formulario"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
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