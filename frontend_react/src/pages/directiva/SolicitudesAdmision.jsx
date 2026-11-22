import { useCallback, useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';

const DATOS_VACIOS = { correoEstudiante: '', contrasenaEstudiante: '', contrasenaApoderado: '' };

function SolicitudesAdmision() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [apoderado, setApoderado] = useState(null); // cuenta de apoderado ya existente para el RUT de la postulación
  const [buscandoApoderado, setBuscandoApoderado] = useState(false);
  const [datos, setDatos] = useState(DATOS_VACIOS);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const cargarSolicitudes = useCallback(async () => {
    try {
      const resultado = await api('/api/postulaciones?estado=PENDIENTE');
      setSolicitudes(resultado);
    } catch (error) {
      setMensaje(error.message);
    }
  }, []);

  useEffect(() => { cargarSolicitudes(); }, [cargarSolicitudes]);

  function editar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  // al elegir una solicitud se consulta si su apoderado ya tiene cuenta
  async function seleccionar(solicitud) {
    setSeleccionada(solicitud);
    setApoderado(null);
    setDatos(DATOS_VACIOS);
    setMensaje('');
    setBuscandoApoderado(true);

    try {
      const existente = await api(`/api/postulaciones/${solicitud.id}/apoderado`);
      setApoderado(existente || null);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setBuscandoApoderado(false);
    }
  }

  const existe = apoderado !== null;
  const otroRol = existe && apoderado.rol !== 'APODERADO';
  const correoDistinto = existe && !otroRol && !apoderado.correoCoincide;
  const bloqueada = otroRol || correoDistinto;
  // la contraseña del apoderado solo se pide si su cuenta es nueva o estaba dada de baja
  const requiereClaveApoderado = !existe || !apoderado.activo;

  async function resolver(accion) {
    if (!seleccionada) return;
    if (accion === 'APROBAR') {
      if (!datos.correoEstudiante || datos.contrasenaEstudiante.length < 8) {
        setMensaje('Para aprobar, ingresa el correo institucional del estudiante y su contraseña (mínimo 8 caracteres).');
        return;
      }
      if (requiereClaveApoderado && datos.contrasenaApoderado.length < 8) {
        setMensaje('Para aprobar, ingresa la contraseña inicial del apoderado (mínimo 8 caracteres).');
        return;
      }
    }

    setCargando(true);
    setMensaje('');
    try {
      const { contrasenaApoderado, ...resto } = datos;
      const cuerpo = {
        accion,
        ...(accion === 'APROBAR' ? resto : {}),
        ...(accion === 'APROBAR' && requiereClaveApoderado ? { contrasenaApoderado } : {}),
      };

      const resultado = await api(`/api/postulaciones/${seleccionada.id}/resolver`, {
        method: 'POST',
        body: JSON.stringify(cuerpo),
      });
      setMensaje(accion === 'APROBAR'
        ? `Postulación aprobada. Se crearon o vincularon las cuentas (estudiante ID ${resultado.estudianteUsuarioId}, apoderado ID ${resultado.apoderadoUsuarioId}).`
        : 'Postulación rechazada.');
      setSeleccionada(null);
      setApoderado(null);
      setDatos(DATOS_VACIOS);
      await cargarSolicitudes();
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <PanelLayout rol="Directiva" claseEtiqueta="etiqueta-directiva">
      <h1 className="mb-2">Solicitudes de admisión</h1>
      <p className="mb-4">Revisa postulaciones pendientes. Al aprobar, se crearán las cuentas del estudiante y su apoderado.</p>

      {mensaje && <div className="alert alert-info" role="status">{mensaje}</div>}

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="list-group">
            {solicitudes.length === 0 && <div className="alert alert-secondary">No hay solicitudes pendientes.</div>}
            {solicitudes.map((solicitud) => (
              <button key={solicitud.id} type="button"
                className={`list-group-item list-group-item-action ${seleccionada?.id === solicitud.id ? 'active' : ''}`}
                onClick={() => seleccionar(solicitud)}>
                <strong>{solicitud.nombresPostulante} {solicitud.apellidosPostulante}</strong>
                <span className="d-block small">RUT {solicitud.rutPostulante} · Curso {solicitud.curso}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="col-lg-7">
          {seleccionada && (
            <section className="caja-valor border rounded p-4">
              <h2 className="fs-4">Revisar postulación #{seleccionada.id}</h2>
              <h3 className="fs-6 mt-3">Estudiante</h3>
              <p className="mb-1">{seleccionada.nombresPostulante} {seleccionada.apellidosPostulante}</p>
              <p className="mb-1">RUT: {seleccionada.rutPostulante}</p>
              <p className="mb-1">Nacimiento: {seleccionada.fechaNacimiento}</p>
              <p className="mb-1">Curso solicitado: {seleccionada.curso}</p>
              <h3 className="fs-6 mt-3">Apoderado</h3>
              <p className="mb-1">{seleccionada.nombresApoderado} {seleccionada.apellidosApoderado}</p>
              <p className="mb-1">RUT: {seleccionada.rutApoderado}</p>
              <p className="mb-1">Correo: {seleccionada.correoApoderado}</p>
              <p className="mb-1">Teléfono: {seleccionada.telefonoApoderado}</p>
              {seleccionada.observaciones && <p className="mt-2"><strong>Observaciones:</strong> {seleccionada.observaciones}</p>}

              {buscandoApoderado && <p className="small text-muted mt-3 mb-0">Comprobando si el apoderado ya tiene cuenta…</p>}

              {!buscandoApoderado && !existe && (
                <div className="alert alert-secondary small mt-3 mb-0" role="status">
                  Apoderado nuevo: se creará una cuenta con el correo de la postulación.
                </div>
              )}

              {!buscandoApoderado && existe && (
                <div className={`alert ${bloqueada ? 'alert-danger' : 'alert-info'} small mt-3 mb-0`} role="status">
                  {otroRol ? (
                    <>El RUT del apoderado ya pertenece a una cuenta con rol {apoderado.rol}. No se puede aprobar esta postulación.</>
                  ) : (
                    <>
                      <strong>Apoderado ya registrado:</strong> {apoderado.nombres} {apoderado.apellidos} · {apoderado.correo} · {apoderado.alumnosActivos} alumno(s) activo(s).
                      {correoDistinto
                        ? ' El correo de la postulación es distinto al de esa cuenta. Rechaza la solicitud y pide que postulen de nuevo con el correo correcto, o confirma el dato con el apoderado.'
                        : ' El alumno se vinculará a esa cuenta y se mantienen sus datos actuales.'}
                      {!correoDistinto && !apoderado.nombreCoincide && ' Ojo: el nombre escrito en la postulación no coincide con el de la cuenta; verifica que sea la misma persona.'}
                      {!apoderado.activo && ' Esa cuenta estaba dada de baja: se reactivará con la contraseña que ingreses abajo.'}
                    </>
                  )}
                </div>
              )}

              <hr />
              <h3 className="fs-5">Datos para crear las cuentas</h3>
              <div className="mb-3">
                <label htmlFor="correo-estudiante" className="form-label fw-bold">Correo institucional del estudiante</label>
                <input id="correo-estudiante" name="correoEstudiante" type="email" className="form-control campo-formulario"
                  placeholder="alumno@estudiante.deepcollege.cl" value={datos.correoEstudiante} onChange={editar} />
              </div>
              <div className="mb-3">
                <label htmlFor="clave-estudiante" className="form-label fw-bold">Contraseña inicial del estudiante</label>
                <input id="clave-estudiante" name="contrasenaEstudiante" type="password" minLength="8"
                  className="form-control campo-formulario" value={datos.contrasenaEstudiante} onChange={editar} />
              </div>
              {requiereClaveApoderado && (
                <div className="mb-3">
                  <label htmlFor="clave-apoderado" className="form-label fw-bold">Contraseña inicial del apoderado</label>
                  <input id="clave-apoderado" name="contrasenaApoderado" type="password" minLength="8"
                    className="form-control campo-formulario" value={datos.contrasenaApoderado} onChange={editar} />
                  <small className="text-muted">Usará el correo de la postulación.</small>
                </div>
              )}
              <p className="small text-muted">No se envía correo automáticamente. Anota las contraseñas iniciales antes de aprobar y entrégalas por un canal seguro.</p>
              <div className="d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-outline-danger" disabled={cargando}
                  onClick={() => resolver('RECHAZAR')}>Rechazar</button>
                <button type="button" className="btn boton-calcular" disabled={cargando || buscandoApoderado || bloqueada}
                  onClick={() => resolver('APROBAR')}>{cargando ? 'Guardando…' : 'Aprobar y crear cuentas'}</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </PanelLayout>
  );
}

export default SolicitudesAdmision;
