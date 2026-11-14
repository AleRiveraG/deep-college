import { useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';

const perfilVacio = {
  nombres: '',
  apellidos: '',
  rut: '',
  nivel: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
};

function MiPerfil() {
  const [perfil, setPerfil] = useState(perfilVacio);
  const [borrador, setBorrador] = useState(perfilVacio);
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let vigente = true;

    api('/api/usuarios/me')
      .then((usuario) => {
        if (!vigente) return;

        if (usuario.rol !== 'DOCENTE') {
          throw new Error('La cuenta conectada no corresponde a un docente.');
        }

        const datos = {
          nombres: usuario.nombres || '',
          apellidos: usuario.apellidos || '',
          rut: usuario.rut || '',
          nivel: usuario.nivel || '',
          telefono: usuario.telefono || '',
          correo: usuario.correo || '',
          fechaNacimiento: usuario.fechaNacimiento || '',
        };

        setPerfil(datos);
        setBorrador(datos);
      })
      .catch((e) => {
        if (vigente) setError(e.message || 'No se pudo cargar el perfil.');
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  function actualizarCampo(evento) {
    setBorrador((actual) => ({
      ...actual,
      [evento.target.name]: evento.target.value,
    }));
  }

  function cancelarEdicion() {
    setBorrador(perfil);
    setEditando(false);
    setError('');
    setMensaje('');
  }

  async function guardarPerfil(evento) {
    evento.preventDefault();
    setError('');
    setMensaje('');

    setGuardando(true);

    try {
      const actualizado = await api('/api/usuarios/me', {
        method: 'PUT',
        body: JSON.stringify({
          nombres: borrador.nombres.trim(),
          apellidos: borrador.apellidos.trim(),
          rut: borrador.rut.trim(),
          telefono: borrador.telefono.trim() || null,
          fechaNacimiento: borrador.fechaNacimiento || null,
          curso: null,
          nivel: borrador.nivel.trim(),
        }),
      });

      const datos = {
        nombres: actualizado.nombres || '',
        apellidos: actualizado.apellidos || '',
        rut: actualizado.rut || '',
        nivel: actualizado.nivel || '',
        telefono: actualizado.telefono || '',
        correo: actualizado.correo || perfil.correo,
        fechaNacimiento: actualizado.fechaNacimiento || '',
      };

      setPerfil(datos);
      setBorrador(datos);
      setEditando(false);
      setMensaje('Perfil actualizado correctamente.');
    } catch (e) {
      setError(e.message || 'No se pudo guardar el perfil.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <PanelLayout rol="Docente" claseEtiqueta="rol-docente">
      <h1 className="mb-4">Mi perfil</h1>
      <h2 className="fs-6 mb-4">
        Consulta y actualiza tu información personal.
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {cargando && <p>Cargando perfil…</p>}

      {!cargando && !error && (
        <div className="caja-valor p-4">
          <form onSubmit={guardarPerfil}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nombres" className="form-label fw-bold small">
                  Nombres *
                </label>
                <input
                  id="nombres"
                  name="nombres"
                  type="text"
                  className="form-control form-control-sm campo-formulario"
                  value={borrador.nombres}
                  onChange={actualizarCampo}
                  disabled={!editando}
                  maxLength="100"
                  required
                />
              </div>

              <div className="col-md-6 mt-3 mt-md-0">
                <label htmlFor="apellidos" className="form-label fw-bold small">
                  Apellidos *
                </label>
                <input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  className="form-control form-control-sm campo-formulario"
                  value={borrador.apellidos}
                  onChange={actualizarCampo}
                  disabled={!editando}
                  maxLength="100"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="rut" className="form-label fw-bold small">
                  RUT *
                </label>
                <input
                  id="rut"
                  name="rut"
                  type="text"
                  className="form-control form-control-sm campo-formulario"
                  placeholder="12.345.678-9"
                  value={borrador.rut}
                  onChange={actualizarCampo}
                  disabled={!editando}
                  required
                />
              </div>

              <div className="col-md-6 mt-3 mt-md-0">
                <label htmlFor="nivel" className="form-label fw-bold small">
                  Nivel de enseñanza *
                </label>
                <input
                  id="nivel"
                  name="nivel"
                  type="text"
                  className="form-control form-control-sm campo-formulario"
                  placeholder="Por ejemplo: Educación Media"
                  value={borrador.nivel}
                  onChange={actualizarCampo}
                  disabled={!editando}
                  maxLength="80"
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label fw-bold small">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="form-control form-control-sm campo-formulario"
                  value={borrador.telefono}
                  onChange={actualizarCampo}
                  disabled={!editando}
                  maxLength="30"
                />
              </div>

              <div className="col-md-6 mt-3 mt-md-0">
                <label htmlFor="correo" className="form-label fw-bold small">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  type="email"
                  className="form-control form-control-sm"
                  value={perfil.correo}
                  disabled
                  readOnly
                />
                <small className="text-muted">
                  El correo de acceso no se modifica desde esta pantalla.
                </small>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label
                  htmlFor="fechaNacimiento"
                  className="form-label fw-bold small"
                >
                  Fecha de nacimiento
                </label>
                <input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  className="form-control form-control-sm campo-formulario"
                  value={borrador.fechaNacimiento}
                  onChange={actualizarCampo}
                  disabled={!editando}
                />
              </div>
            </div>

            <div className="text-end">
              {!editando ? (
                <button
                  type="button"
                  className="btn btn-sm boton-calcular px-4"
                  onClick={() => {
                    setBorrador(perfil);
                    setEditando(true);
                    setMensaje('');
                  }}
                >
                  Modificar
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary px-4 me-2"
                    onClick={cancelarEdicion}
                    disabled={guardando}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-sm boton-calcular px-4"
                    disabled={guardando}
                  >
                    {guardando ? 'Guardando…' : 'Guardar cambios'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </PanelLayout>
  );
}

export default MiPerfil;