import { useCallback, useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';
import { cursosDisponibles } from '../../hooks/useAlumnosDocente';

const cursosBasica = cursosDisponibles.filter((c) => c.valor.endsWith('-basico'));
const cursosMedia = cursosDisponibles.filter((c) => c.valor.endsWith('-medio'));

const ESTADOS = {
  PENDIENTE: { texto: 'Pendiente de revisión', clase: 'bg-warning text-dark' },
  ACEPTADA: { texto: 'Aceptada', clase: 'bg-success' },
  RECHAZADA: { texto: 'Rechazada', clase: 'bg-danger' },
};

function PostularHijo() {
  const [apoderado, setApoderado] = useState(null);
  const [misSolicitudes, setMisSolicitudes] = useState([]);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [rut, setRut] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [curso, setCurso] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [terminos, setTerminos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargarSolicitudes = useCallback(async () => {
    try {
      const resultado = await api('/api/postulaciones/apoderado/mias');
      setMisSolicitudes(resultado || []);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar tus solicitudes.');
    }
  }, []);

  useEffect(() => {
    api('/api/usuarios/me')
      .then(setApoderado)
      .catch((e) => setError(e.message || 'No se pudieron cargar tus datos.'));
    cargarSolicitudes();
  }, [cargarSolicitudes]);

  function validar() {
    if (nombres.trim().length < 3 || /\d/.test(nombres) || apellidos.trim().length < 3 || /\d/.test(apellidos)) {
      return 'Ingresa nombres y apellidos válidos del postulante.';
    }
    if (rut.trim().length < 8 || !rut.includes('-')) {
      return 'El RUT del postulante no es válido (ej: 12.345.678-9).';
    }
    if (!fechaNacimiento) {
      return 'Debes ingresar la fecha de nacimiento del postulante.';
    }
    if (!curso) {
      return 'Debes seleccionar el curso al que postula.';
    }
    if (!terminos) {
      return 'Debes autorizar el uso de los datos para continuar.';
    }
    return '';
  }

  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    setExito('');

    const problema = validar();
    if (problema) {
      setError(problema);
      return;
    }

    setEnviando(true);
    try {
      await api('/api/postulaciones/apoderado', {
        method: 'POST',
        body: JSON.stringify({
          nombresPostulante: nombres.trim(),
          apellidosPostulante: apellidos.trim(),
          rutPostulante: rut.trim(),
          fechaNacimiento,
          curso,
          observaciones: observaciones.trim(),
          aceptaUsoDatos: terminos,
        }),
      });
      setExito('Solicitud enviada. La Directiva la revisará y te avisará cuando el alumno tenga su cuenta.');
      setNombres('');
      setApellidos('');
      setRut('');
      setFechaNacimiento('');
      setCurso('');
      setObservaciones('');
      setTerminos(false);
      await cargarSolicitudes();
    } catch (e) {
      setError(e.message || 'No se pudo enviar la solicitud. Intenta nuevamente.');
    } finally {
      setEnviando(false);
    }
  }

  const hoy = new Date().toISOString().split('T')[0];

  return (
    <PanelLayout rol="Apoderado" claseEtiqueta="rol-estudiante">
      <h1 className="titulo-principal mb-2">Postular otro hijo/a</h1>
      <p className="mb-4">
        Tus datos como apoderado ya están registrados, solo completa los datos del nuevo alumno.
        Al ser aprobado quedará vinculado a tu misma cuenta.
      </p>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {exito && <div className="alert alert-success" role="status">{exito}</div>}

      {apoderado && (
        <div className="caja-valor border rounded p-3 mb-4">
          <h2 className="fs-6 fw-bold mb-2">Apoderado (desde tu cuenta)</h2>
          <p className="mb-1">{apoderado.nombres} {apoderado.apellidos}</p>
          <p className="mb-1 small">RUT: {apoderado.rut} · Correo: {apoderado.correo}</p>
          {apoderado.telefono && <p className="mb-0 small">Teléfono: {apoderado.telefono}</p>}
        </div>
      )}

      <form onSubmit={enviar} className="caja-valor border rounded p-4 mb-5">
        <h2 className="fs-5 mb-3">Datos del postulante</h2>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="hijo-nombres" className="form-label fw-bold">Nombres *</label>
            <input id="hijo-nombres" type="text" className="form-control campo-formulario"
              value={nombres} onChange={(e) => setNombres(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="hijo-apellidos" className="form-label fw-bold">Apellidos *</label>
            <input id="hijo-apellidos" type="text" className="form-control campo-formulario"
              value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="hijo-rut" className="form-label fw-bold">RUT *</label>
            <input id="hijo-rut" type="text" className="form-control campo-formulario"
              placeholder="12.345.678-9" value={rut} onChange={(e) => setRut(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="hijo-nacimiento" className="form-label fw-bold">Fecha de nacimiento *</label>
            <input id="hijo-nacimiento" type="date" max={hoy} className="form-control campo-formulario"
              value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label htmlFor="hijo-curso" className="form-label fw-bold">Curso al que postula *</label>
            <select id="hijo-curso" className="form-select campo-formulario"
              value={curso} onChange={(e) => setCurso(e.target.value)}>
              <option value="" disabled>Seleccione un curso</option>
              <optgroup label="Educación Básica">
                {cursosBasica.map((c) => <option key={c.valor} value={c.valor}>{c.nombre}</option>)}
              </optgroup>
              <optgroup label="Educación Media">
                {cursosMedia.map((c) => <option key={c.valor} value={c.valor}>{c.nombre}</option>)}
              </optgroup>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="hijo-observaciones" className="form-label fw-bold">Observaciones (opcional)</label>
            <textarea id="hijo-observaciones" rows="3" maxLength="1900" className="form-control campo-formulario"
              value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input id="hijo-terminos" type="checkbox" className="form-check-input"
                checked={terminos} onChange={(e) => setTerminos(e.target.checked)} />
              <label htmlFor="hijo-terminos" className="form-check-label">
                Autorizo el uso de los datos para el proceso de admisión *
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn boton-calcular px-4" disabled={enviando}>
            {enviando ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </div>
      </form>

      <h2 className="fs-5 mb-3">Mis solicitudes</h2>
      {misSolicitudes.length === 0 ? (
        <div className="alert alert-secondary">Aún no has enviado solicitudes.</div>
      ) : (
        <div className="table-responsive tabla">
          <table className="table mb-0">
            <thead className="encabezado-tabla">
              <tr>
                <th>Postulante</th>
                <th>RUT</th>
                <th>Curso</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {misSolicitudes.map((s) => {
                const estado = ESTADOS[s.estado] || { texto: s.estado, clase: 'bg-secondary' };
                return (
                  <tr key={s.id}>
                    <td>{s.nombresPostulante} {s.apellidosPostulante}</td>
                    <td>{s.rutPostulante}</td>
                    <td>{cursosDisponibles.find((c) => c.valor === s.curso)?.nombre || s.curso}</td>
                    <td><span className={`badge ${estado.clase}`}>{estado.texto}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </PanelLayout>
  );
}

export default PostularHijo;
