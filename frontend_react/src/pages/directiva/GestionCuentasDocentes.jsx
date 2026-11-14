import { useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';

const formularioInicial = {
  correo: '',
  contrasena: '',
  confirmarContrasena: '',
  rut: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  fechaNacimiento: '',
  nivel: '',
};

function GestionCuentasDocentes() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info');

  function actualizarCampo(evento) {
    setFormulario((anterior) => ({
      ...anterior,
      [evento.target.name]: evento.target.value,
    }));
  }

  async function crearCuenta(evento) {
    evento.preventDefault();
    setMensaje('');

    if (!formulario.correo.toLowerCase().endsWith('@docente.deepcollege.cl')) {
      setTipoMensaje('danger');
      setMensaje('El correo debe terminar en @docente.deepcollege.cl.');
      return;
    }

    if (formulario.contrasena.length < 8) {
      setTipoMensaje('danger');
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setTipoMensaje('danger');
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    const solicitud = {
      correo: formulario.correo.trim().toLowerCase(),
      contrasena: formulario.contrasena,
      rol: 'DOCENTE',
      rut: formulario.rut.trim(),
      nombres: formulario.nombres.trim(),
      apellidos: formulario.apellidos.trim(),
      telefono: formulario.telefono.trim() || null,
      fechaNacimiento: formulario.fechaNacimiento || null,
      curso: null,
      nivel: formulario.nivel.trim(),
      apoderadoId: null,
    };

    setCargando(true);

    try {
      const creado = await api('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(solicitud),
      });

      setTipoMensaje('success');
      setMensaje(
        `Cuenta docente creada correctamente. Correo: ${creado.correo}. ID: ${creado.id}.`
      );
      setFormulario(formularioInicial);
    } catch (error) {
      setTipoMensaje('danger');
      setMensaje(error.message || 'No se pudo crear la cuenta docente.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <PanelLayout rol="Directiva" claseEtiqueta="etiqueta-directiva">
      <h1 className="titulo-principal mb-2">Crear cuenta docente</h1>
      <p className="mb-4">
        Completa los datos para crear una cuenta que pueda iniciar sesión en el sistema.
      </p>

      {mensaje && (
        <div className={`alert alert-${tipoMensaje}`} role="status">
          {mensaje}
        </div>
      )}

      <form
        className="tarjeta-blanca caja-valor border rounded p-4"
        onSubmit={crearCuenta}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="docente-nombres" className="form-label fw-bold">
              Nombres
            </label>
            <input
              id="docente-nombres"
              name="nombres"
              className="form-control campo-formulario"
              value={formulario.nombres}
              onChange={actualizarCampo}
              maxLength="100"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-apellidos" className="form-label fw-bold">
              Apellidos
            </label>
            <input
              id="docente-apellidos"
              name="apellidos"
              className="form-control campo-formulario"
              value={formulario.apellidos}
              onChange={actualizarCampo}
              maxLength="100"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-rut" className="form-label fw-bold">
              RUT
            </label>
            <input
              id="docente-rut"
              name="rut"
              className="form-control campo-formulario"
              placeholder="12.345.678-9"
              value={formulario.rut}
              onChange={actualizarCampo}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-correo" className="form-label fw-bold">
              Correo institucional
            </label>
            <input
              id="docente-correo"
              name="correo"
              type="email"
              className="form-control campo-formulario"
              placeholder="nombre@docente.deepcollege.cl"
              value={formulario.correo}
              onChange={actualizarCampo}
              maxLength="180"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-telefono" className="form-label fw-bold">
              Teléfono
            </label>
            <input
              id="docente-telefono"
              name="telefono"
              type="tel"
              className="form-control campo-formulario"
              value={formulario.telefono}
              onChange={actualizarCampo}
              maxLength="30"
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-nacimiento" className="form-label fw-bold">
              Fecha de nacimiento
            </label>
            <input
              id="docente-nacimiento"
              name="fechaNacimiento"
              type="date"
              className="form-control campo-formulario"
              value={formulario.fechaNacimiento}
              onChange={actualizarCampo}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-nivel" className="form-label fw-bold">
                Nivel de enseñanza
            </label>
            <select
            id="docente-nivel"
            name="nivel"
            className="form-select campo-formulario"
            value={formulario.nivel}
            onChange={actualizarCampo}
            required
            >
                <option value="">Selecciona un nivel</option>
                <option value="BASICA">Enseñanza básica</option>
                <option value="MEDIA">Enseñanza media</option>
                <option value="TODOS">Todos los niveles</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="docente-contrasena" className="form-label fw-bold">
              Contraseña inicial
            </label>
            <input
              id="docente-contrasena"
              name="contrasena"
              type="password"
              className="form-control campo-formulario"
              value={formulario.contrasena}
              onChange={actualizarCampo}
              minLength="8"
              maxLength="100"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="col-md-6">
            <label
              htmlFor="docente-confirmar-contrasena"
              className="form-label fw-bold"
            >
              Confirmar contraseña
            </label>
            <input
              id="docente-confirmar-contrasena"
              name="confirmarContrasena"
              type="password"
              className="form-control campo-formulario"
              value={formulario.confirmarContrasena}
              onChange={actualizarCampo}
              minLength="8"
              maxLength="100"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <p className="small text-muted mt-3 mb-4">
          Entrega al docente su correo y contraseña inicial por un canal seguro.
          Podrá iniciar sesión con esos datos.
        </p>

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn boton-calcular"
            disabled={cargando}
          >
            {cargando ? 'Creando cuenta…' : 'Crear cuenta docente'}
          </button>
        </div>
      </form>
    </PanelLayout>
  );
}

export default GestionCuentasDocentes;