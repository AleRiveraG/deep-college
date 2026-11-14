import { useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';

const formularioInicial = {
  correo: '',
  contrasena: '',
  rut: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  fechaNacimiento: '',
  curso: '',
  nivel: '',
  apoderadoId: '',
};

function AsignarCuentas() {
  const [rol, setRol] = useState('APODERADO');
  const [form, setForm] = useState(formularioInicial);
  const [apoderados, setApoderados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    api('/api/usuarios/apoderados')
      .then(setApoderados)
      .catch((error) => setMensaje({ tipo: 'danger', texto: error.message }));
  }, []);

  function cambiarCampo(evento) {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  }

  async function crearCuenta(evento) {
    evento.preventDefault();
    setCargando(true);
    setMensaje(null);

    const datos = {
      correo: form.correo.trim(),
      contrasena: form.contrasena,
      rol,
      rut: form.rut.trim(),
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
      telefono: form.telefono.trim(),
    };

    if (rol === 'ESTUDIANTE') {
      datos.fechaNacimiento = form.fechaNacimiento || null;
      datos.curso = form.curso;
      datos.apoderadoId = Number(form.apoderadoId);
    }

    if (rol === 'DOCENTE') {
      datos.nivel = form.nivel;
    }

    try {
      const creado = await api('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(datos),
      });

      if (rol === 'APODERADO') {
        setApoderados((actuales) => [...actuales, creado]);
      }

      setMensaje({
        tipo: 'success',
        texto: `Cuenta creada: ${creado.correo} (ID ${creado.id}).`,
      });
      setForm(formularioInicial);
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: error.message });
    } finally {
      setCargando(false);
    }
  }

  return (
    <PanelLayout rol="directiva">
      <h1 className="mb-2">Asignar cuentas</h1>
      <p className="mb-4">
        Crea cuentas de acceso para apoderados, estudiantes y docentes.
      </p>

      {mensaje && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <form className="caja-valor border rounded p-4" onSubmit={crearCuenta}>
        <div className="mb-3">
          <label className="form-label fw-bold" htmlFor="rol-cuenta">Tipo de cuenta</label>
          <select
            id="rol-cuenta"
            className="form-select campo-formulario"
            value={rol}
            onChange={(e) => {
              setRol(e.target.value);
              setMensaje(null);
            }}
          >
            <option value="APODERADO">Apoderado</option>
            <option value="ESTUDIANTE">Estudiante</option>
            <option value="DOCENTE">Docente</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="nombres">Nombres</label>
            <input id="nombres" name="nombres" className="form-control campo-formulario"
              value={form.nombres} onChange={cambiarCampo} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="apellidos">Apellidos</label>
            <input id="apellidos" name="apellidos" className="form-control campo-formulario"
              value={form.apellidos} onChange={cambiarCampo} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="rut">RUT</label>
            <input id="rut" name="rut" className="form-control campo-formulario"
              placeholder="12.345.678-9" value={form.rut} onChange={cambiarCampo} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="correo">Correo de acceso</label>
            <input id="correo" name="correo" type="email" className="form-control campo-formulario"
              value={form.correo} onChange={cambiarCampo} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="contrasena">Contraseña inicial</label>
            <input id="contrasena" name="contrasena" type="password" minLength="8"
              className="form-control campo-formulario" value={form.contrasena}
              onChange={cambiarCampo} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold" htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" className="form-control campo-formulario"
              value={form.telefono} onChange={cambiarCampo} />
          </div>
        </div>

        {rol === 'ESTUDIANTE' && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold" htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <input id="fechaNacimiento" name="fechaNacimiento" type="date"
                className="form-control campo-formulario" value={form.fechaNacimiento}
                onChange={cambiarCampo} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold" htmlFor="curso">Curso</label>
              <select id="curso" name="curso" className="form-select campo-formulario"
                value={form.curso} onChange={cambiarCampo} required>
                <option value="">Selecciona un curso</option>
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
            <div className="col-12 mb-3">
              <label className="form-label fw-bold" htmlFor="apoderadoId">Apoderado</label>
              <select id="apoderadoId" name="apoderadoId" className="form-select campo-formulario"
                value={form.apoderadoId} onChange={cambiarCampo} required>
                <option value="">Selecciona un apoderado</option>
                {apoderados.map((apoderado) => (
                  <option key={apoderado.id} value={apoderado.id}>
                    {apoderado.nombres} {apoderado.apellidos} — {apoderado.correo}
                  </option>
                ))}
              </select>
              {apoderados.length === 0 && (
                <small className="text-muted">Primero crea la cuenta del apoderado.</small>
              )}
            </div>
          </div>
        )}

        {rol === 'DOCENTE' && (
          <div className="mb-3">
            <label className="form-label fw-bold" htmlFor="nivel">Nivel</label>
            <select id="nivel" name="nivel" className="form-select campo-formulario"
              value={form.nivel} onChange={cambiarCampo} required>
              <option value="">Selecciona el nivel</option>
              <option value="Educación Básica">Educación Básica</option>
              <option value="Educación Media">Educación Media</option>
            </select>
          </div>
        )}

        <button className="btn boton-calcular px-4" type="submit" disabled={cargando}>
          {cargando ? 'Creando…' : 'Crear cuenta'}
        </button>
      </form>
    </PanelLayout>
  );
}

export default AsignarCuentas;