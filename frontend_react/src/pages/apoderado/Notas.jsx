import { useState } from "react";
import PanelLayout from "../../components/PanelLayout";

const enlacesApoderado = [
  { ruta: '/apoderado/asistencia', icono: 'bx-clipboard-check', iconoClase: 'icono-asistencia', texto: 'Asistencia' },
  { ruta: '/apoderado/notas', icono: 'bx-education', iconoClase: 'icono-notas', texto: 'Notas' },
  { ruta: '/apoderado/horario', icono: 'bx-calendar-alt', iconoClase: 'icono-horarios', texto: 'Horario' },
];

const hijosApoderado = [
  {
    id: 'h1',
    nombre: 'Alberto Khan Zhaito Gonzalez',
    curso: '3° Medio A',
    notas: [
      { asignatura: 'Estadistica', ES: [6.7, 6.5], EF: [6.2, 6.8], ED: [7.0, 6.5, 5.8] },
      { asignatura: 'Base de Datos', ES: [6.7, 6.5], EF: [6.2, 6.8], ED: [7.0, 6.5, 5.8] },
      { asignatura: 'Desarrollo FullStack II', ES: [6.7, 6.5], EF: [6.2, 6.8], ED: [7.0, 6.5, 5.8] },
    ],
  },
  {
    id: 'h2',
    nombre: 'Camila Zhaito Gonzalez',
    curso: '6° Básico B',
    notas: [
      { asignatura: 'Matemática', ES: [5.8, 6.1], EF: [6.0, 5.5], ED: [6.5, 6.0, 6.2] },
      { asignatura: 'Lenguaje', ES: [6.9, 6.4], EF: [6.6, 6.8], ED: [7.0, 6.7, 6.5] },
      { asignatura: 'Ciencias Naturales', ES: [5.2, 5.9], EF: [5.7, 6.0], ED: [6.0, 5.8, 6.3] },
    ],
  },
];

const promedio = (lista) => lista.reduce((suma, nota) => suma + nota, 0) / lista.length;
const promedioAsignatura = (asig) => promedio(asig.ES) * 0.35 + promedio(asig.EF) * 0.35 + promedio(asig.ED) * 0.3;

function Notas() {
  const [hijoId, setHijoId] = useState(hijosApoderado[0].id);
  const hijo = hijosApoderado.find((h) => h.id === hijoId);

  const promedios = hijo.notas.map(promedioAsignatura);
  const promedioGeneral = promedios.reduce((suma, p) => suma + p, 0) / promedios.length;

  return (
    <PanelLayout rol="Apoderado" claseEtiqueta="rol-estudiante" items={enlacesApoderado} claseSeccion="py-4 px-4 seccion-notas">
      <h1 className="titulo-principal mb-4">Notas del alumno</h1>
      <h2 className="fs-6 mb-4">Revisa las calificaciones y conoce el rendimiento académico de tu pupilo.</h2>

      <div className="tarjeta-blanca p-3 border rounded mb-4 d-flex flex-wrap align-items-center gap-3">
        <label htmlFor="selector-alumno" className="form-label etiqueta-input fw-bold mb-0">
          <i className="bx bx-user me-2 icono-perfil"></i>Alumno
        </label>
        <select
          id="selector-alumno"
          className="form-select campo-formulario w-auto flex-grow-1"
          style={{ maxWidth: '420px' }}
          value={hijoId}
          onChange={(e) => setHijoId(e.target.value)}
        >
          {hijosApoderado.map((h) => (
            <option key={h.id} value={h.id}>
              {h.nombre} - {h.curso}
            </option>
          ))}
        </select>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
            <i className="bx bx-note-book fs-1 text-primary me-4"></i>
            <div className="text-start">
              <span className="d-block fs-3 fw-bold monto-valor">{hijo.notas.length}</span>
              <span className="etiqueta-valor small">Asignaturas</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4 border rounded caja-valor h-100 d-flex align-items-center">
            <i className="bx bx-medal fs-1 text-warning me-4"></i>
            <div className="text-start">
              <span className="d-block fs-3 fw-bold monto-valor">{promedioGeneral.toFixed(1)}</span>
              <span className="etiqueta-valor small">Promedio General</span>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive contenedor-tabla">
        <table className="table table-bordered text-center align-middle tabla-horarios bg-white">
          <thead className="encabezado-tabla">
            <tr>
              <th colSpan="1" className="border-0"></th>
              <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#1C2866' }}>Sumativa (35%)</th>
              <th colSpan="2" className="border-end text-white" style={{ backgroundColor: '#283A94' }}>Formativa (35%)</th>
              <th colSpan="3" className="border-end text-white" style={{ backgroundColor: '#334ABD' }}>Desempeño (30%)</th>
              <th colSpan="1" className="border-0"></th>
            </tr>
            <tr>
              <th style={{ backgroundColor: '#283A94', color: 'white' }} className="border-end">Asignatura</th>
              <th style={{ width: '8%' }}>ES1</th>
              <th className="border-end" style={{ width: '8%' }}>ES2</th>
              <th style={{ width: '8%' }}>EF1</th>
              <th className="border-end" style={{ width: '8%' }}>EF2</th>
              <th style={{ width: '8%' }}>ED1</th>
              <th style={{ width: '8%' }}>ED2</th>
              <th className="border-end" style={{ width: '8%' }}>ED3</th>
              <th className="table-secondary fw-bold">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {hijo.notas.map((asignatura, i) => (
              <tr className="fila-horario" key={asignatura.asignatura}>
                <td className="celda-asignatura fw-bold text-start text-white border-end" style={{ backgroundColor: '#283A94' }}>
                  {asignatura.asignatura}
                </td>
                <td>{asignatura.ES[0].toFixed(1)}</td>
                <td className="border-end">{asignatura.ES[1].toFixed(1)}</td>
                <td>{asignatura.EF[0].toFixed(1)}</td>
                <td className="border-end">{asignatura.EF[1].toFixed(1)}</td>
                <td>{asignatura.ED[0].toFixed(1)}</td>
                <td>{asignatura.ED[1].toFixed(1)}</td>
                <td className="border-end">{asignatura.ED[2].toFixed(1)}</td>
                <td className="fw-bold table-secondary">{promedios[i].toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelLayout>
  );
}

export default Notas;