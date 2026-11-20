import { useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import { cursosDisponibles } from '../../hooks/useAlumnosDocente';
import { apiAcademico } from '../../services/api';

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const modulosBase = [
  '08:01-08:40',
  '08:41-09:20',
  '09:31-10:10',
  '10:11-10:50',
  '11:01-11:40',
  '11:41-12:20',
];

const formatoModulo = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

function filasVacias() {
  return modulosBase.map((modulo) => ({
    modulo,
    clases: ['', '', '', '', ''],
  }));
}

function Horarios() {
  const [curso, setCurso] = useState('');
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setMensaje('');
    setError('');

    if (!curso) {
      setFilas([]);
      return undefined;
    }

    let vigente = true;
    setCargando(true);

    apiAcademico(`/api/academico/cursos/${encodeURIComponent(curso)}/horario`)
      .then((lista) => {
        if (vigente) setFilas(lista.length > 0 ? lista : filasVacias());
      })
      .catch((e) => {
        if (vigente) setError(e.message || 'No se pudo cargar el horario.');
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [curso]);

  function cambiarClase(indiceFila, indiceDia, valor) {
    setFilas((actuales) =>
      actuales.map((fila, i) =>
        i === indiceFila
          ? {
              ...fila,
              clases: fila.clases.map((c, d) => (d === indiceDia ? valor : c)),
            }
          : fila
      )
    );
  }

  function cambiarModulo(indiceFila, valor) {
    setFilas((actuales) =>
      actuales.map((fila, i) =>
        i === indiceFila ? { ...fila, modulo: valor } : fila
      )
    );
  }

  function agregarFila() {
    setFilas((actuales) => [
      ...actuales,
      { modulo: '', clases: ['', '', '', '', ''] },
    ]);
  }

  function quitarFila(indiceFila) {
    setFilas((actuales) => actuales.filter((_, i) => i !== indiceFila));
  }

  async function guardar() {
    setMensaje('');
    setError('');

    const filaInvalida = filas.find(
      (fila) =>
        fila.clases.some((c) => c.trim()) &&
        !formatoModulo.test(fila.modulo.trim())
    );

    if (filaInvalida) {
      setError('Cada módulo con clases debe tener el formato 08:00-08:45.');
      return;
    }

    const bloques = filas.flatMap((fila) =>
      fila.clases
        .map((asignatura, i) => ({
          dia: i + 1,
          modulo: fila.modulo.trim(),
          asignatura: asignatura.trim(),
        }))
        .filter((bloque) => bloque.asignatura)
    );

    setGuardando(true);

    try {
      const nuevo = await apiAcademico(
        `/api/academico/cursos/${encodeURIComponent(curso)}/horario`,
        { method: 'PUT', body: JSON.stringify({ bloques }) }
      );
      setFilas(nuevo.length > 0 ? nuevo : filasVacias());
      setMensaje('Horario guardado.');
    } catch (e) {
      setError(e.message || 'No se pudo guardar el horario.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <PanelLayout claseSeccion="py-4 px-4 seccion-horarios">
      <h1 className="mb-4">Horarios</h1>
      <h2 className="fs-6 mb-4">
        Consulta y edita el horario de cada curso.
      </h2>

      <div className="mb-4 contenedor-filtro">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="curso" className="form-label fw-bold small">
              Seleccione un curso:
            </label>
            <select
              id="curso"
              className="form-select campo-formulario"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
            >
              <option value="">Selecciona un curso</option>
              {cursosDisponibles.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      {cargando && <p>Cargando horario…</p>}

      {curso && !cargando && (
        <>
          <div className="table-responsive contenedor-tabla">
            <table
              id="horario"
              className="table table-bordered tabla-horarios text-center align-middle"
            >
              <thead className="encabezado-tabla">
                <tr>
                  <th>Módulo Horario</th>
                  {dias.map((dia) => (
                    <th key={dia}>{dia}</th>
                  ))}
                  <th aria-label="Acciones"></th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila, indiceFila) => (
                  <tr key={indiceFila} className="fila-horario">
                    <td className="fw-bold celda-hora">
                      <input
                        className="form-control form-control-sm text-center"
                        value={fila.modulo}
                        placeholder="08:00-08:45"
                        onChange={(e) =>
                          cambiarModulo(indiceFila, e.target.value)
                        }
                      />
                    </td>
                    {fila.clases.map((asignatura, indiceDia) => (
                      <td key={indiceDia} className="celda-asignatura">
                        <input
                          className="form-control form-control-sm"
                          value={asignatura}
                          maxLength={100}
                          onChange={(e) =>
                            cambiarClase(indiceFila, indiceDia, e.target.value)
                          }
                        />
                      </td>
                    ))}
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => quitarFila(indiceFila)}
                        aria-label="Quitar módulo"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary px-4"
              onClick={agregarFila}
            >
              Agregar módulo
            </button>
            <button
              type="button"
              className="btn boton-calcular px-4"
              disabled={guardando}
              onClick={guardar}
            >
              {guardando ? 'Guardando…' : 'Guardar horario'}
            </button>
          </div>
        </>
      )}
    </PanelLayout>
  );
}

export default Horarios;