import { useEffect, useState } from 'react';
import PanelLayout from './PanelLayout';
import { api } from '../services/api';
import datosDemoAcademicos from '../data/datosDemoAcademicos';

const enlacesApoderado = [
  {
    ruta: '/apoderado/asistencia',
    icono: 'bx-clipboard-check',
    iconoClase: 'icono-asistencia',
    texto: 'Asistencia',
  },
  {
    ruta: '/apoderado/notas',
    icono: 'bx-education',
    iconoClase: 'icono-notas',
    texto: 'Notas',
  },
  {
    ruta: '/apoderado/horario',
    icono: 'bx-calendar-alt',
    iconoClase: 'icono-horarios',
    texto: 'Horario',
  },
];

function promedio(valores = []) {
  if (valores.length === 0) return 0;

  return valores.reduce((total, valor) => total + valor, 0) / valores.length;
}

function fechaLegible(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function DatosAcademicosDemo({ rol, vista }) {
  const esApoderado = rol === 'APODERADO';
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoId, setAlumnoId] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let vigente = true;
    const endpoint = esApoderado
      ? '/api/apoderados/me/pupilos'
      : '/api/usuarios/me';

    api(endpoint)
      .then((resultado) => {
        if (!vigente) return;

        const lista = Array.isArray(resultado) ? resultado : [resultado];
        setAlumnos(lista);
        setAlumnoId(lista.length ? String(lista[0].id) : '');
      })
      .catch((e) => {
        if (vigente) {
          setError(e.message || 'No se pudo cargar el perfil.');
        }
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [esApoderado]);

  const alumno = alumnos.find((item) => String(item.id) === alumnoId) || null;
  const datos = alumno ? datosDemoAcademicos[String(alumno.id)] : null;

  const porcentajeAsistencia = datos?.asistencia?.totalClases
    ? Math.round(
        ((datos.asistencia.totalClases -
          datos.asistencia.inasistencias.length) /
          datos.asistencia.totalClases) *
          100
      )
    : 0;

  const cantidadAsistencias = datos
    ? datos.asistencia.totalClases - datos.asistencia.inasistencias.length
    : 0;

  const promedioAsignaturas =
    datos?.notas.map((nota) =>
      promedio([...nota.ES, ...nota.EF, ...nota.ED])
    ) || [];

  const promedioGeneral = promedio(promedioAsignaturas);

  const titulos = {
    notas: esApoderado ? 'Notas del alumno' : 'Mis Notas',
    asistencia: esApoderado ? 'Asistencia del alumno' : 'Mi asistencia',
    horario: esApoderado ? 'Horario del alumno' : 'Mi horario',
  };

  const descripciones = {
    notas: esApoderado
      ? 'Revisa las calificaciones y el rendimiento académico de tu pupilo.'
      : 'Revisa tus calificaciones y conoce tu rendimiento académico.',
    asistencia: esApoderado
      ? 'Consulta el registro de asistencia de tu pupilo.'
      : 'Revisa tu asistencia y el detalle de tus inasistencias.',
    horario: esApoderado
      ? 'Consulta el horario de clases de tu pupilo.'
      : 'Revisa tu horario y organiza mejor tu jornada académica.',
  };

  const claseSeccion =
    vista === 'horario'
      ? 'py-4 px-4 seccion-horarios'
      : vista === 'notas'
        ? 'py-4 px-4 seccion-notas'
        : 'py-5 px-4 px-md-5 fondo-panel';

  return (
    <PanelLayout
      rol={esApoderado ? 'Apoderado' : 'Estudiante'}
      claseEtiqueta="rol-estudiante"
      items={esApoderado ? enlacesApoderado : undefined}
      claseSeccion={claseSeccion}
    >
      <h1 className="titulo-principal mb-4">{titulos[vista]}</h1>
      <h2 className="fs-6 mb-4">{descripciones[vista]}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {cargando && <p>Cargando…</p>}

      {!cargando && esApoderado && alumnos.length > 0 && (
        <div className="tarjeta-blanca p-3 border rounded mb-4 d-flex align-items-center gap-3">
          <label htmlFor="alumno-demo" className="form-label fw-bold mb-0">
            Alumno
          </label>
          <select
            id="alumno-demo"
            className="form-select w-auto flex-grow-1"
            value={alumnoId}
            onChange={(e) => setAlumnoId(e.target.value)}
          >
            {alumnos.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.nombres} {item.apellidos}
                {item.curso ? ` - ${item.curso}` : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {!cargando && !error && !alumno && (
        <div className="alert alert-info">
          {esApoderado
            ? 'Esta cuenta no tiene estudiantes asociados.'
            : 'No se encontró el perfil del estudiante.'}
        </div>
      )}

      {!cargando && alumno && !datos && (
        <div className="alert alert-secondary">
          No hay datos de prueba para este alumno.
        </div>
      )}

      {datos && vista === 'notas' && (
        <>
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
                <i className="bx bx-note-book fs-1 text-primary me-4"></i>
                <div className="text-start">
                  <span className="d-block fs-3 fw-bold monto-valor">
                    {datos.notas.length}
                  </span>
                  <span className="etiqueta-valor small">Asignaturas</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
                <i className="bx bx-medal fs-1 text-warning me-4"></i>
                <div className="text-start">
                  <span className="d-block fs-3 fw-bold monto-valor">
                    {promedioGeneral.toFixed(1)}
                  </span>
                  <span className="etiqueta-valor small">Promedio General</span>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive contenedor-tabla">
            <table className="table table-bordered tabla-horarios text-center align-middle bg-white mb-0">
              <thead className="encabezado-tabla">
                <tr>
                  <th scope="col" className="text-start">
                    Asignatura
                  </th>
                  <th scope="col">Evaluación 1</th>
                  <th scope="col">Evaluación 2</th>
                  <th scope="col">Evaluación 3</th>
                  <th scope="col">Evaluación 4</th>
                  <th scope="col">Evaluación 5</th>
                  <th scope="col">Evaluación 6</th>
                  <th scope="col">Evaluación 7</th>
                  <th scope="col" className="table-secondary fw-bold">
                    Promedio
                  </th>
                </tr>
              </thead>

              <tbody>
                {datos.notas.map((nota) => {
                  const valores = [...nota.ES, ...nota.EF, ...nota.ED];

                  return (
                    <tr className="fila-horario" key={nota.asignatura}>
                      <td
                        className="celda-asignatura fw-bold text-start"
                        style={{
                          backgroundColor: '#e8edff',
                          color: '#1C2866',
                        }}
                      >
                        {nota.asignatura}
                      </td>

                      {Array.from({ length: 7 }, (_, indice) => (
                        <td key={indice}>
                          {valores[indice] ?? '—'}
                        </td>
                      ))}

                      <td className="fw-bold table-secondary">
                        {promedio(valores).toFixed(1)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {datos && vista === 'asistencia' && (
        <>
          <div className="row g-4 mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <i className="bx bx-percentage fs-1 icono-metrica-neutra mb-2"></i>
                <span className="d-block fs-3 fw-bold monto-valor">
                  {porcentajeAsistencia}%
                </span>
                <span className="etiqueta-valor small texto-secundario">
                  Asistencia Global
                </span>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <i className="bx bx-calendar-alt fs-1 icono-eventos mb-2"></i>
                <span className="d-block fs-3 fw-bold monto-valor">
                  {datos.asistencia.totalClases}
                </span>
                <span className="etiqueta-valor small texto-secundario">
                  Total Clases
                </span>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <i className="bx bx-check-circle fs-1 icono-metrica-ok mb-2"></i>
                <span className="d-block fs-3 fw-bold monto-valor">
                  {cantidadAsistencias}
                </span>
                <span className="etiqueta-valor small texto-secundario">
                  Asistencias
                </span>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <i className="bx bx-x-circle fs-1 texto-peligro mb-2"></i>
                <span className="d-block fs-3 fw-bold texto-peligro">
                  {datos.asistencia.inasistencias.length}
                </span>
                <span className="etiqueta-valor small texto-secundario">
                  Inasistencias
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h2 className="subtitulo mb-4">Detalle de inasistencias</h2>
            <div className="row g-4">
              {datos.asistencia.inasistencias.map((fecha) => (
                <div className="col-md-6 col-lg-3" key={fecha}>
                  <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                    <h3 className="fs-6 fw-bold mb-2">{fechaLegible(fecha)}</h3>
                    <p className="mb-0 small texto-peligro fw-semibold">
                      <i className="bx bx-error-circle me-1"></i>
                      Ausente
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tarjeta-blanca p-4 border rounded d-flex align-items-center">
            <i className="bx bx-alert-triangle fs-2 icono-metrica-alerta me-3"></i>
            <p className="mb-0 fs-5 fw-bold texto-destacado">
              Recuerda que la asistencia mínima exigida es del 70%.
            </p>
          </div>
        </>
      )}

      {datos && vista === 'horario' && (
        <div className="table-responsive contenedor-tabla">
          <table className="table table-bordered tabla-horarios text-center align-middle">
            <thead className="encabezado-tabla">
              <tr>
                <th>Módulo Horario</th>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miércoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
              </tr>
            </thead>
            <tbody>
              {datos.horario.map((fila) => (
                <tr className="fila-horario" key={fila.modulo}>
                  <td className="fw-bold celda-hora">{fila.modulo}</td>
                  {fila.clases.map((clase, indice) => (
                    <td className="celda-asignatura" key={indice}>
                      {clase}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PanelLayout>
  );
}

export default DatosAcademicosDemo;