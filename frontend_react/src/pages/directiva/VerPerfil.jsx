import { useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { api } from '../../services/api';
import { cursosDisponibles } from '../../hooks/useAlumnosDocente';

// Directiva puede ver todos los cursos (básica y media), a diferencia del docente
const cursosBasica = cursosDisponibles.filter((c) => c.valor.endsWith('-basico'));
const cursosMedia = cursosDisponibles.filter((c) => c.valor.endsWith('-medio'));

function VerPerfiles() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [texto, setTexto] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [bajaEnCurso, setBajaEnCurso] = useState(null);

  // al cambiar de curso se piden al backend los estudiantes de ese curso
  async function seleccionarCurso(valor) {
    setCursoSeleccionado(valor);
    setTexto('');
    setAlumnos([]);
    setError('');
    setMensaje('');

    if (!valor) return;

    setCargando(true);

    try {
      const parametros = new URLSearchParams({ rol: 'ESTUDIANTE', curso: valor });
      const resultado = await api(`/api/usuarios?${parametros.toString()}`);
      setAlumnos(resultado || []);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los estudiantes del curso.');
    } finally {
      setCargando(false);
    }
  }

  // da de baja al alumno (solo directiva). El backend decide si el apoderado también se da de baja
  async function darDeBaja(alumno) {
    const nombre = `${alumno.nombres} ${alumno.apellidos}`;
    const confirmado = window.confirm(
      `¿Dar de baja a ${nombre}?\n\nSu cuenta quedará desactivada. Si su apoderado no tiene otros alumnos activos, su cuenta también se desactivará.`
    );
    if (!confirmado) return;

    setBajaEnCurso(alumno.id);
    setMensaje('');
    setError('');

    try {
      const respuesta = await api(`/api/usuarios/estudiantes/${alumno.id}/baja`, { method: 'POST' });
      setAlumnos((actuales) => actuales.filter((a) => a.id !== alumno.id));

      if (respuesta?.apoderadoDadoDeBaja) {
        setMensaje(`${nombre} fue dado de baja junto con su apoderado.`);
      } else if (respuesta?.apoderadoMantenido) {
        setMensaje(`${nombre} fue dado de baja. Su apoderado sigue activo porque tiene otros alumnos en el colegio.`);
      } else {
        setMensaje(`${nombre} fue dado de baja.`);
      }
    } catch (e) {
      setError(e.message || 'No se pudo dar de baja al alumno.');
    } finally {
      setBajaEnCurso(null);
    }
  }

  const nombreCurso = cursosDisponibles.find((c) => c.valor === cursoSeleccionado)?.nombre;

  // se buscan coincidencias en todos los campos del alumno
  const resultados = alumnos.filter((alumno) => {
    const datos = [alumno.nombres, alumno.apellidos, alumno.rut, alumno.telefono, alumno.correo]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return datos.includes(texto.toLowerCase());
  });

  return (
    <PanelLayout>
      <h1 className="mb-4">Ver perfiles por curso</h1>
      <h2 className="fs-6 mb-4">Consulta los datos de los alumnos por curso.</h2>
      <div className="caja-valor p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <label htmlFor="cursos" className="fw-bold mb-2">Seleccione un curso:</label>
          <select
            id="cursos"
            className="form-select campo-formulario"
            value={cursoSeleccionado}
            onChange={(e) => seleccionarCurso(e.target.value)}
            disabled={cargando}
          >
            <option value="" disabled>Seleccione</option>
            <optgroup label="Educación Básica">
              {cursosBasica.map((c) => (
                <option key={c.valor} value={c.valor}>{c.nombre}</option>
              ))}
            </optgroup>
            <optgroup label="Educación Media">
              {cursosMedia.map((c) => (
                <option key={c.valor} value={c.valor}>{c.nombre}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <div className="contenedor-busqueda">
            <input
              id="busqueda"
              className="form-control busqueda-input"
              placeholder="Buscar por nombre"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <i className="bx bx-search icono-busqueda"></i>
          </div>
        </div>
      </div>

      {cargando && <p>Cargando…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-success" role="status">{mensaje}</div>}

      {!cargando && !error && cursoSeleccionado && alumnos.length === 0 && (
        <div className="alert alert-info">
          No hay estudiantes registrados en {nombreCurso}.
        </div>
      )}

      {!cargando && !error && resultados.length > 0 && (
        <div className="table-responsive tabla">
          <table className="table mb-0">
            <thead className="encabezado-tabla">
              <tr>
                <th>Número</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Rut</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((alumno, indice) => (
                <tr key={alumno.id}>
                  <td>{indice + 1}</td>
                  <td>{alumno.nombres}</td>
                  <td>{alumno.apellidos}</td>
                  <td>{alumno.rut}</td>
                  <td>{alumno.telefono || '—'}</td>
                  <td>{alumno.correo}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      disabled={bajaEnCurso === alumno.id}
                      onClick={() => darDeBaja(alumno)}
                    >
                      {bajaEnCurso === alumno.id ? 'Procesando…' : 'Dar de baja'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!cargando && !error && alumnos.length > 0 && resultados.length === 0 && (
        <div className="alert alert-secondary">
          No hay alumnos que coincidan con la búsqueda.
        </div>
      )}
    </PanelLayout>
  );
}

export default VerPerfiles;