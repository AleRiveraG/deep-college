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
    horario: [
      { modulo: '08:01-08:40', clases: ['Estadistica', '', '', 'Aplicaciones Moviles', ''] },
      { modulo: '08:41-09:20', clases: ['Estadistica', '', 'Aplicaciones Moviles', 'Aplicaciones Moviles', ''] },
      { modulo: '09:31-10:10', clases: ['', 'Desarrollo FullStack II', 'Aplicaciones Moviles', 'Estadistica', ''] },
      { modulo: '10:11-10:50', clases: ['', 'Desarrollo FullStack II', 'Aplicaciones Moviles', 'Estadistica', ''] },
      { modulo: '11:01-11:40', clases: ['', 'Desarrollo FullStack II', 'Desarrollo FullStack II', '', ''] },
      { modulo: '11:41-12:20', clases: ['', 'Taller Base de Datos', 'Desarrollo FullStack II', '', ''] },
      { modulo: '12:31-13:10', clases: ['', 'Taller Base de Datos', 'Desarrollo FullStack II', '', ''] },
    ],
  },
  {
    id: 'h2',
    nombre: 'Camila Zhaito Gonzalez',
    curso: '6° Básico B',
    horario: [
      { modulo: '08:01-08:40', clases: ['Matemática', 'Lenguaje', 'Ciencias Naturales', 'Matemática', 'Inglés'] },
      { modulo: '08:41-09:20', clases: ['Matemática', 'Lenguaje', 'Ciencias Naturales', 'Matemática', 'Inglés'] },
      { modulo: '09:31-10:10', clases: ['Historia', 'Matemática', 'Lenguaje', 'Ciencias Naturales', 'Artes'] },
      { modulo: '10:11-10:50', clases: ['Historia', 'Matemática', 'Lenguaje', 'Ciencias Naturales', 'Artes'] },
      { modulo: '11:01-11:40', clases: ['Educación Física', 'Inglés', 'Historia', 'Lenguaje', 'Música'] },
      { modulo: '11:41-12:20', clases: ['Educación Física', 'Inglés', 'Historia', '', 'Música'] },
      { modulo: '12:31-13:10', clases: ['', 'Tecnología', '', '', ''] },
    ],
  },
];

function Horario() {
  const [hijoId, setHijoId] = useState(hijosApoderado[0].id);
  const hijo = hijosApoderado.find((h) => h.id === hijoId);

  return (
    <PanelLayout rol="Apoderado" claseEtiqueta="rol-estudiante" items={enlacesApoderado} claseSeccion="py-4 px-4 seccion-horarios">
      <h1 className="titulo-principal mb-4">Horario del alumno</h1>
      <h2 className="fs-6 mb-4">Revisa el horario de tu pupilo y organiza mejor su jornada académica.</h2>

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

      <div className="table-responsive contenedor-tabla">
        <table id="horario" className="table table-bordered table-striped text-center align-middle tabla-horarios bg-white">
          <thead className="encabezado-tabla">
            <tr>
              <th>Módulo</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
            </tr>
          </thead>
          <tbody>
            {hijo.horario.map((fila) => (
              <tr className="fila-horario" key={fila.modulo}>
                <td className="fw-bold celda-hora">{fila.modulo}</td>
                {fila.clases.map((clase, i) => (
                  <td className="celda-asignatura" key={i}>{clase}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PanelLayout>
  );
}

export default Horario;