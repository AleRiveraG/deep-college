import { useState } from 'react';
import PanelLayout from '../../components/PanelLayout';
import useAlumnosDocente from '../../hooks/useAlumnosDocente';

function VerPerfiles() {
  const {
    nivel,
    cursos,
    curso,
    alumnos,
    error,
    cargando,
    seleccionarCurso,
  } = useAlumnosDocente();

  const [texto, setTexto] = useState('');

  const resultados = alumnos.filter((alumno) => {
    const datos = [
      alumno.nombres,
      alumno.apellidos,
      alumno.rut,
      alumno.telefono,
      alumno.correo,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return datos.includes(texto.toLowerCase());
  });

  return (
    <PanelLayout rol="Docente" claseEtiqueta="rol-docente">
      <h1 className="mb-4">Ver perfiles por curso</h1>
      <h2 className="fs-6 mb-4">
        Consulta los datos de los alumnos de los niveles que tienes asignados.
      </h2>

      <div className="caja-valor p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <label htmlFor="curso-perfiles" className="fw-bold mb-2">
            Seleccione un curso:
          </label>
          <select
            id="curso-perfiles"
            className="form-select campo-formulario"
            value={curso}
            onChange={(e) => seleccionarCurso(e.target.value)}
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

        {curso && (
          <div className="contenedor-busqueda">
            <input
              id="busqueda"
              className="form-control busqueda-input"
              placeholder="Buscar alumno"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <i className="bx bx-search icono-busqueda"></i>
          </div>
        )}
      </div>

      {!cargando && !error && cursos.length === 0 && (
        <div className="alert alert-warning">
          Tu cuenta no tiene un nivel de enseñanza asignado. Pide a Directiva
          que actualice tu cuenta.
        </div>
      )}

      {cargando && <p>Cargando…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && curso && alumnos.length === 0 && (
        <div className="alert alert-info">
          No hay estudiantes registrados en {cursos.find((c) => c.valor === curso)?.nombre}.
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
                <th>RUT</th>
                <th>Teléfono</th>
                <th>Correo</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!cargando && curso && alumnos.length > 0 && resultados.length === 0 && (
        <div className="alert alert-secondary">
          No hay alumnos que coincidan con la búsqueda.
        </div>
      )}

      {nivel && (
        <small className="text-muted d-block mt-3">
          Nivel asignado: {nivel}
        </small>
      )}
    </PanelLayout>
  );
}

export default VerPerfiles;