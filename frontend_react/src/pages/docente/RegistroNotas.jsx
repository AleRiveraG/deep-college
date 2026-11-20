import { useEffect, useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import useAlumnosDocente from '../../hooks/useAlumnosDocente';
import useNotasCurso from '../../hooks/useNotasCurso';
import {
  ETIQUETAS_EVALUACION,
  formatearPromedio,
  porcentaje,
  promedioPonderado,
} from '../../utils/calculoNotas';

const camposNotas = ['es1', 'es2', 'ef1', 'ef2', 'ed1', 'ed2', 'ed3'];

function obtenerValores(nota) {
  return {
    es1: nota?.ES?.[0] ?? '',
    es2: nota?.ES?.[1] ?? '',
    ef1: nota?.EF?.[0] ?? '',
    ef2: nota?.EF?.[1] ?? '',
    ed1: nota?.ED?.[0] ?? '',
    ed2: nota?.ED?.[1] ?? '',
    ed3: nota?.ED?.[2] ?? '',
  };
}

function calcularPromedio(valores) {
  const promedio = promedioPonderado({
    ES: [valores.es1, valores.es2],
    EF: [valores.ef1, valores.ef2],
    ED: [valores.ed1, valores.ed2, valores.ed3],
  });

  return promedio === null ? null : formatearPromedio(promedio);
}

function claseNota(valor) {
  if (valor === '' || valor === null || valor === undefined) {
    return 'nota-vacia';
  }

  const nota = Number(valor);

  if (!Number.isFinite(nota)) return 'nota-vacia';
  if (nota < 4) return 'nota-baja';
  if (nota >= 6) return 'nota-alta';

  return 'nota-media';
}

function RegistroNotas() {
  const {
    nivel,
    cursos,
    curso,
    alumnos,
    error,
    cargando,
    seleccionarCurso,
  } = useAlumnosDocente();

  const [asignatura, setAsignatura] = useState('');
  const [ediciones, setEdiciones] = useState({});
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setAsignatura('');
    setEditando(false);
  }, [curso]);

  const {
    asignaturas,
    asignaturaActiva,
    notasPorAlumno,
    errorNotas,
    guardando,
    guardar,
  } = useNotasCurso(curso, asignatura);

  const filas = alumnos.map((alumno, indice) => {
    const notaBase = notasPorAlumno[alumno.id];

    const llave = `${alumno.id}-${asignaturaActiva}`;
    const valores = ediciones[llave] || obtenerValores(notaBase);

    return {
      llave,
      alumno,
      numero: indice + 1,
      valores,
      promedio: calcularPromedio(valores),
    };
  });

  const filasConPromedio = filas.filter((fila) => fila.promedio !== null);

  const promedioCurso = filasConPromedio.length
    ? (
        filasConPromedio.reduce(
          (suma, fila) => suma + Number(fila.promedio),
          0
        ) / filasConPromedio.length
      ).toFixed(1)
    : '—';

  function actualizarNota(llave, campo, valor) {
    setEdiciones((actuales) => {
      const filaActual =
        actuales[llave] ||
        filas.find((fila) => fila.llave === llave)?.valores ||
        {};

      return {
        ...actuales,
        [llave]: {
          ...filaActual,
          [campo]: valor,
        },
      };
    });
  }

  async function guardarCambios() {
    const editadas = filas
      .filter((fila) => ediciones[fila.llave])
      .map((fila) => ({ alumnoId: fila.alumno.id, valores: fila.valores }));

    if (editadas.length === 0) {
      setMensaje('No hay cambios para guardar.');
      return;
    }

    try {
      await guardar(editadas);
      setEdiciones({});
      setEditando(false);
      setMensaje('Notas guardadas.');
    } catch (e) {
      setMensaje(e.message || 'No se pudieron guardar las notas.');
    }
  }

  return (
    <PanelLayout rol="Docente" claseEtiqueta="rol-docente">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h1 className="titulo-principal mb-2">Registro de notas</h1>
          <p className="mb-0">
            Consulta las calificaciones por curso y asignatura.
          </p>
        </div>

        {nivel && (
          <span className="badge rounded-pill px-3 py-2 rol-docente">
            Nivel: {nivel}
          </span>
        )}
      </div>

      <section className="tarjeta-blanca border rounded-3 p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label htmlFor="curso-notas" className="form-label fw-bold">
              Curso
            </label>
            <select
              id="curso-notas"
              className="form-select campo-formulario"
              value={curso}
              onChange={(e) => seleccionarCurso(e.target.value)}
              disabled={cargando}
            >
              <option value="">Selecciona un curso</option>
              {cursos.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                  {opcion.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="asignatura-notas" className="form-label fw-bold">
              Asignatura
            </label>
            <select
              id="asignatura-notas"
              className="form-select campo-formulario"
              value={asignaturaActiva}
              onChange={(e) => setAsignatura(e.target.value)}
              disabled={!curso || asignaturas.length === 0}
            >
              {asignaturas.length === 0 ? (
                <option value="">Selecciona primero un curso</option>
              ) : (
                asignaturas.map((nombre) => (
                  <option key={nombre} value={nombre}>
                    {nombre}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </section>

      {error && <div className="alert alert-danger">{error}</div>}
      {errorNotas && <div className="alert alert-danger">{errorNotas}</div>}
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      {cargando && <p>Cargando alumnos…</p>}

      {!cargando && !error && cursos.length === 0 && (
        <div className="alert alert-warning">
          Tu cuenta no tiene un nivel de enseñanza asignado. Pide a Directiva
          que revise tu cuenta.
        </div>
      )}

      {!cargando && curso && alumnos.length === 0 && !error && (
        <div className="alert alert-info">
          No hay estudiantes registrados en este curso.
        </div>
      )}

      {!cargando && alumnos.length > 0 && asignaturas.length === 0 && (
        <div className="alert alert-info">
          Este curso aún no tiene asignaturas. Directiva debe registrar el
          horario del curso para poder ingresar notas.
        </div>
      )}

      {!cargando && alumnos.length > 0 && asignaturaActiva && (
        <>
          <section className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="tarjeta-blanca border rounded-3 p-4 h-100 d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#e8edff',
                    color: '#334ABD',
                  }}
                  aria-hidden="true"
                >
                  <i className="bx bx-user fs-3"></i>
                </div>

                <div>
                  <span className="d-block fs-3 fw-bold monto-valor">
                    {alumnos.length}
                  </span>
                  <span className="small texto-secundario">
                    {alumnos.length === 1
                      ? 'Alumno del curso'
                      : 'Alumnos del curso'}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="tarjeta-blanca border rounded-3 p-4 h-100 d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#fff4d6',
                    color: '#d99b00',
                  }}
                  aria-hidden="true"
                >
                  <i className="bx bx-medal fs-3"></i>
                </div>

                <div>
                  <span className="d-block fs-3 fw-bold monto-valor">
                    {promedioCurso}
                  </span>
                  <span className="small texto-secundario">
                    Promedio de {asignaturaActiva}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="tarjeta-blanca border rounded-3 p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
              <div>
                <h2 className="fs-4 fw-bold mb-1">{asignaturaActiva}</h2>
                <p className="small texto-secundario mb-0">
                  Registro de calificaciones
                </p>
              </div>

              {editando && (
                <span className="badge rounded-pill text-bg-light border">
                  Edición habilitada
                </span>
              )}
            </div>

            <div className="table-responsive contenedor-tabla">
              <table
                className="table table-bordered table-hover text-center align-middle tabla-horarios bg-white mb-0"
                style={{ minWidth: '1050px' }}
              >
                <thead>
                  <tr>
                    <th
                      aria-hidden="true"
                      style={{ width: '70px', backgroundColor: '#1C2866' }}
                    ></th>
                    <th
                      aria-hidden="true"
                      style={{ minWidth: '230px', backgroundColor: '#1C2866' }}
                    ></th>

                    <th
                      colSpan={2}
                      scope="colgroup"
                      className="text-white"
                      style={{ backgroundColor: '#1C2866' }}
                    >
                      {ETIQUETAS_EVALUACION.ES} ({porcentaje('ES')}%)
                    </th>

                    <th
                      colSpan={2}
                      scope="colgroup"
                      className="text-white"
                      style={{ backgroundColor: '#283A94' }}
                    >
                      {ETIQUETAS_EVALUACION.EF} ({porcentaje('EF')}%)
                    </th>

                    <th
                      colSpan={3}
                      scope="colgroup"
                      className="text-white"
                      style={{ backgroundColor: '#334ABD' }}
                    >
                      {ETIQUETAS_EVALUACION.ED} ({porcentaje('ED')}%)
                    </th>

                    <th
                      aria-hidden="true"
                      style={{
                        minWidth: '110px',
                        backgroundColor: '#e8edff',
                      }}
                    ></th>
                  </tr>

                  <tr className="encabezado-tabla">
                    <th scope="col">N.º</th>
                    <th scope="col" className="text-start">
                      Estudiante
                    </th>
                    <th scope="col">ES1</th>
                    <th scope="col">ES2</th>
                    <th scope="col">EF1</th>
                    <th scope="col">EF2</th>
                    <th scope="col">ED1</th>
                    <th scope="col">ED2</th>
                    <th scope="col">ED3</th>
                    <th
                      scope="col"
                      style={{
                        backgroundColor: '#e8edff',
                        color: '#1C2866',
                      }}
                    >
                      Promedio
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filas.map((fila) => (
                    <tr key={fila.llave}>
                      <td className="fw-semibold">{fila.numero}</td>

                      <td className="text-start fw-semibold texto-destacado">
                        {fila.alumno.nombres} {fila.alumno.apellidos}
                      </td>

                      {camposNotas.map((campo, indice) => (
                        <td key={campo}>
                          {editando ? (
                            <input
                              type="number"
                              min="1"
                              max="7"
                              step="0.1"
                              aria-label={`Evaluación ${indice + 1} de ${fila.alumno.nombres} ${fila.alumno.apellidos}`}
                              className="form-control form-control-sm text-center campo-formulario mx-auto"
                              style={{ width: '78px' }}
                              value={fila.valores[campo]}
                              onChange={(e) =>
                                actualizarNota(
                                  fila.llave,
                                  campo,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <span
                              className={`d-inline-block rounded-2 px-3 py-1 fw-semibold ${claseNota(
                                fila.valores[campo]
                              )}`}
                              style={{ minWidth: '48px' }}
                            >
                              {fila.valores[campo] === ''
                                ? '—'
                                : fila.valores[campo]}
                            </span>
                          )}
                        </td>
                      ))}

                      <td
                        className="fw-bold"
                        style={{
                          backgroundColor: '#e8edff',
                          color: '#1C2866',
                        }}
                      >
                        {fila.promedio ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="small texto-secundario mt-3 mb-0">
              Promedio ponderado: Sumativa {porcentaje('ES')}%, Formativa{' '}
              {porcentaje('EF')}% y Desempeño {porcentaje('ED')}%.
            </p>

            <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                disabled={!editando}
                onClick={() => setEdiciones({})}
              >
                Restablecer
              </button>

              <button
                type="button"
                className="btn btn-success px-4"
                disabled={!editando || guardando}
                onClick={guardarCambios}
              >
                {guardando ? 'Guardando…' : 'Guardar cambios'}
              </button>

              <button
                type="button"
                className="btn boton-calcular px-4"
                onClick={() => setEditando((actual) => !actual)}
              >
                {editando ? 'Terminar edición' : 'Habilitar edición'}
              </button>
            </div>
          </section>
        </>
      )}
    </PanelLayout>
  );
}

export default RegistroNotas;