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
    asistencia: {
      totalClases: 50,
      inasistencias: ['Lunes 24 de Agosto', 'Jueves 27 de Agosto', 'Martes 7 de Julio', 'Viernes 28 de Agosto'],
    },
  },
  {
    id: 'h2',
    nombre: 'Camila Zhaito Gonzalez',
    curso: '6° Básico B',
    asistencia: {
      totalClases: 50,
      inasistencias: ['Miércoles 19 de Agosto', 'Lunes 31 de Agosto'],
    },
  },
];

function Asistencia(){ 
    const [hijoId, setHijoId] = useState(hijosApoderado[0].id);
    const hijo = hijosApoderado.find((h) => h.id === hijoId);

    const { totalClases, inasistencias } = hijo.asistencia;
    const asistidas = totalClases - inasistencias.length;
    const porcentaje = Math.round((asistidas / totalClases) * 100);

    return (
        <PanelLayout rol= "Apoderado" claseEtiqueta="rol-estudiante" items ={enlacesApoderado} claseSeccion="py-5 px-4 px-md-5 fondo-panel">
            <div className="tarjeta-blanca p-4 p-md-5 mb-4 border rounded">
                <h1 className="titulo-principal mb-0">Asistencia del alumno</h1>
            </div>
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
        <div className="col-md-6 col-lg-3">
          <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <i className="bx bx-percentage fs-1 icono-metrica-neutra mb-2"></i>
            <span className="d-block fs-3 fw-bold monto-valor">{porcentaje}%</span>
            <span className="etiqueta-valor small texto-secundario">Asistencia Global</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <i className="bx bx-calendar-alt fs-1 icono-eventos mb-2"></i>
            <span className="d-block fs-3 fw-bold monto-valor">{totalClases}</span>
            <span className="etiqueta-valor small texto-secundario">Total Clases</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <i className="bx bx-check-circle fs-1 icono-metrica-ok mb-2"></i>
            <span className="d-block fs-3 fw-bold monto-valor">{asistidas}</span>
            <span className="etiqueta-valor small texto-secundario">Asistencias</span>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <i className="bx bx-x-circle fs-1 texto-peligro mb-2"></i>
            <span className="d-block fs-3 fw-bold texto-peligro">{inasistencias.length}</span>
            <span className="etiqueta-valor small texto-secundario">Inasistencias</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="subtitulo mb-4">Detalle de inasistencias</h2>
        <div className="row g-4">
          {inasistencias.map((fecha) => (
            <div className="col-md-6 col-lg-3" key={fecha}>
              <div className="tarjeta-blanca p-4 border rounded caja-valor h-100 borde-peligro">
                <h3 className="fs-6 fw-bold mb-2">{fecha}</h3>
                <p className="mb-0 small texto-peligro fw-semibold"><i className="bx bx-error-circle me-1"></i>Ausente</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tarjeta-blanca p-4 border rounded d-flex align-items-center">
        <i className="bx bx-alert-triangle fs-2 icono-metrica-alerta me-3"></i>
        <p className="mb-0 fs-5 fw-bold texto-destacado">Recuerda que la asistencia mínima exigida es del 70%.</p>
      </div>
        </PanelLayout>
    );
}

export default Asistencia;