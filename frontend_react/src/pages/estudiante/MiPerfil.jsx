import { useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import Boton from '../../components/Boton';
import { api } from '../../services/api';

function separarNombreCompleto(valor = '') {
  const partes = valor.trim().split(/\s+/).filter(Boolean);
  return {
    primero: partes.shift() || '',
    segundo: partes.join(' '),
  };
}

function convertirPerfilAFormulario(perfil) {
  const nombres = separarNombreCompleto(perfil.nombres);
  const apellidos = separarNombreCompleto(perfil.apellidos);

  return {
    primerNombre: nombres.primero,
    segundoNombre: nombres.segundo,
    primerApellido: apellidos.primero,
    segundoApellido: apellidos.segundo,
    rut: perfil.rut || '',
    fechaNacimiento: perfil.fechaNacimiento || '',
  };
}

function MiPerfil() {
  const [form, setForm] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/usuarios/me')
      .then((datos) => {
        setPerfil(datos);
        setForm(convertirPerfilAFormulario(datos));
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  function cambiarCampo(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();

    if (!editando) {
      setEditando(true);
      return;
    }

    const nombres = [form.primerNombre, form.segundoNombre]
      .map((parte) => parte.trim())
      .filter(Boolean)
      .join(' ');

    const apellidos = [form.primerApellido, form.segundoApellido]
      .map((parte) => parte.trim())
      .filter(Boolean)
      .join(' ');

    if (!nombres || !apellidos || !form.rut.trim()) {
      setError('Completa nombres, apellidos y RUT.');
      return;
    }

    setGuardando(true);
    setError('');

    try {
      const actualizado = await api('/api/usuarios/me', {
        method: 'PUT',
        body: JSON.stringify({
          nombres,
          apellidos,
          rut: form.rut.trim(),
          telefono: perfil.telefono || null,
          fechaNacimiento: form.fechaNacimiento || null,
          curso: perfil.curso || null,
          nivel: perfil.nivel || null,
        }),
      });

      setPerfil(actualizado);
      setForm(convertirPerfilAFormulario(actualizado));
      setEditando(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setGuardando(false);
    }
  }

  function cancelarEdicion() {
    setForm(convertirPerfilAFormulario(perfil));
    setEditando(false);
    setError('');
  }

  if (cargando) {
    return (
      <PanelLayout rol="Estudiante" claseEtiqueta="rol-estudiante">
        <p>Cargando perfil…</p>
      </PanelLayout>
    );
  }

  if (!form) {
    return (
      <PanelLayout rol="Estudiante" claseEtiqueta="rol-estudiante">
        <div className="alert alert-danger">
          {error || 'No se pudo cargar el perfil.'}
        </div>
      </PanelLayout>
    );
  }

  return (
    <PanelLayout
      rol="Estudiante"
      claseEtiqueta="rol-estudiante"
      claseSeccion="py-4 px-4 seccion-perfil"
    >
      <h1 className="titulo-principal mb-4">Mi perfil</h1>
      <h2 className="fs-6 mb-4">
        Consulta y actualiza tu información personal.
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="border rounded p-4 caja-valor bg-light">
        <form onSubmit={manejarSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="primer-nombre" className="form-label fw-bold small">
                Primer nombre
              </label>
              <input
                id="primer-nombre"
                name="primerNombre"
                className="form-control form-control-sm campo-formulario"
                value={form.primerNombre}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>

            <div className="col-md-6 mt-3 mt-md-0">
              <label htmlFor="segundo-nombre" className="form-label fw-bold small">
                Segundo nombre
              </label>
              <input
                id="segundo-nombre"
                name="segundoNombre"
                className="form-control form-control-sm campo-formulario"
                value={form.segundoNombre}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="primer-apellido" className="form-label fw-bold small">
                Primer apellido
              </label>
              <input
                id="primer-apellido"
                name="primerApellido"
                className="form-control form-control-sm campo-formulario"
                value={form.primerApellido}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>

            <div className="col-md-6 mt-3 mt-md-0">
              <label htmlFor="segundo-apellido" className="form-label fw-bold small">
                Segundo apellido
              </label>
              <input
                id="segundo-apellido"
                name="segundoApellido"
                className="form-control form-control-sm campo-formulario"
                value={form.segundoApellido}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="rut" className="form-label fw-bold small">
                RUT
              </label>
              <input
                id="rut"
                name="rut"
                className="form-control form-control-sm campo-formulario"
                value={form.rut}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>

            <div className="col-md-6 mt-3 mt-md-0">
              <label htmlFor="fecha-nacimiento" className="form-label fw-bold small">
                Fecha de nacimiento
              </label>
              <input
                id="fecha-nacimiento"
                name="fechaNacimiento"
                type="date"
                className="form-control form-control-sm campo-formulario"
                value={form.fechaNacimiento}
                onChange={cambiarCampo}
                disabled={!editando || guardando}
              />
            </div>
          </div>

          <div className="text-end">
            {editando && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary px-4 me-2"
                onClick={cancelarEdicion}
                disabled={guardando}
              >
                Cancelar
              </button>
            )}

            <Boton
              id="btn-modificar"
              tipo="submit"
              clase="btn btn-sm boton-calcular px-4"
              texto={
                guardando
                  ? 'Guardando…'
                  : editando
                    ? 'Guardar cambios'
                    : 'Modificar'
              }
              deshabilitado={guardando}
            />
          </div>
        </form>
      </div>
    </PanelLayout>
  );
}

export default MiPerfil;