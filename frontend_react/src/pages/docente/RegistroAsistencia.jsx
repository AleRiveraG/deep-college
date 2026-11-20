import { useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import useAlumnosDocente from '../../hooks/useAlumnosDocente';
import { apiAcademico } from '../../services/api';

function hoy() {
  return new Date().toLocaleDateString('en-CA'); // AAAA-MM-DD en hora local
}

function RegistroAsistencia() {
  const {
    nivel,
    cursos,
    curso,
    alumnos,
    error,
    cargando,
    seleccionarCurso,
  } = useAlumnosDocente();

  const [habilitado, setHabilitado] = useState(false);
  const [registros, setRegistros] = useState({});
  const [mensaje, setMensaje] = useState('');

  function cambiarCurso(valor) {
    seleccionarCurso(valor);
    setHabilitado(false);
    setRegistros({});
    setMensaje('');

    if (valor) {
      // Si ya se tomó asistencia hoy, se muestra para poder corregirla
      apiAcademico(
        `/api/academico/cursos/${encodeURIComponent(valor)}/asistencia?fecha=${hoy()}`
      )
        .then((lista) =>
          setRegistros(
            Object.fromEntries(lista.map((r) => [r.estudianteId, r.estado]))
          )
        )
        .catch(() => {});
    }
  }

  function cambiarAsistencia(alumnoId, estado) {
    setRegistros((actuales) => ({
      ...actuales,
      [alumnoId]: estado,
    }));
  }

  async function finalizarClase() {
    const items = alumnos
      .filter((alumno) => registros[alumno.id])
      .map((alumno) => ({
        estudianteId: alumno.id,
        estado: registros[alumno.id],
      }));

    if (items.length === 0) {
      setMensaje('Marca la asistencia de al menos un alumno.');
      return;
    }

    try {
      await apiAcademico(
        `/api/academico/cursos/${encodeURIComponent(curso)}/asistencia`,
        {
          method: 'PUT',
          body: JSON.stringify({ fecha: hoy(), registros: items }),
        }
      );
      setHabilitado(false);
      setMensaje('Asistencia guardada.');
    } catch (e) {
      setMensaje(e.message || 'No se pudo guardar la asistencia.');
    }
  }

  return (
    <PanelLayout rol="Docente" claseEtiqueta="rol-docente">
      <h1 className="mb-4">Registro de asistencia</h1>
      <h2 className="fs-6 mb-4">
        Registra la asistencia de los alumnos de tus cursos.
      </h2>

      <div className="caja-valor p-4 mb-4">
        <label htmlFor="curso-asistencia" className="fw-bold mb-2">
          Seleccione curso:
        </label>
        <select
          id="curso-asistencia"
          className="form-select campo-formulario"
          value={curso}
          onChange={(e) => cambiarCurso(e.target.value)}
          disabled={cargando}
        >
          <option value="">Seleccione</option>
          {cursos.map((opcion) => (
            <option key={opcion.valor} value={opcion.valor}>
              {opcion.nombre}
            </option>
          ))}
        </select>
      </div>

      {cargando && <p>Cargando…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      {!cargando && !error && cursos.length === 0 && (
        <div className="alert alert-warning">
          Tu cuenta no tiene un nivel de enseñanza asignado. Pide a Directiva
          que actualice tu cuenta.
        </div>
      )}

      {!cargando && curso && alumnos.length === 0 && !error && (
        <div className="alert alert-info">
          No hay estudiantes registrados en este curso.
        </div>
      )}

      {!cargando && alumnos.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead className="encabezado-tabla">
                <tr>
                  <th style={{ width: '10%' }}>Número</th>
                  <th style={{ width: '30%' }}>Nombres</th>
                  <th style={{ width: '30%' }}>Apellidos</th>
                  <th style={{ width: '30%' }}>Registro</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno, indice) => (
                  <tr key={alumno.id}>
                    <td>{indice + 1}</td>
                    <td>{alumno.nombres}</td>
                    <td>{alumno.apellidos}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <input
                          type="radio"
                          className="btn-check"
                          name={`asistencia-${alumno.id}`}
                          id={`presente-${alumno.id}`}
                          checked={registros[alumno.id] === 'PRESENTE'}
                          onChange={() => cambiarAsistencia(alumno.id, 'PRESENTE')}
                          disabled={!habilitado}
                        />
                        <label
                          className="btn btn-outline-success btn-sm px-3"
                          htmlFor={`presente-${alumno.id}`}
                        >
                          Presente
                        </label>

                        <input
                          type="radio"
                          className="btn-check"
                          name={`asistencia-${alumno.id}`}
                          id={`ausente-${alumno.id}`}
                          checked={registros[alumno.id] === 'AUSENTE'}
                          onChange={() => cambiarAsistencia(alumno.id, 'AUSENTE')}
                          disabled={!habilitado}
                        />
                        <label
                          className="btn btn-outline-danger btn-sm px-3"
                          htmlFor={`ausente-${alumno.id}`}
                        >
                          Ausente
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              className="btn boton-calcular px-4"
              onClick={() => {
                setHabilitado(true);
                setMensaje('');
              }}
            >
              Registrar asistencia
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={finalizarClase}
              disabled={!habilitado}
            >
              Finalizar clase
            </button>
          </div>
        </>
      )}

      {nivel && (
        <small className="text-muted d-block mt-3">
          Nivel asignado: {nivel}
        </small>
      )}
    </PanelLayout>
  );
}

export default RegistroAsistencia;