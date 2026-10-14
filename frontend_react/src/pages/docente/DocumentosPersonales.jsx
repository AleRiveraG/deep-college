import PanelLayout from '../../components/PanelLayout';
 
function DocumentosPersonales() {
  return (
    <PanelLayout rol="Docente" claseEtiqueta="rol-docente">
      <h1 className="mb-4">Acceso a documentos</h1>
      <h2 className="fs-6 mb-4">Accede a tus documentos personales y descargalos cuando lo necesites.</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="caja-valor p-4 h-100 d-flex flex-column align-items-start">
            <h2 className="fs-5 mb-4">Contrato de trabajo</h2>
            <a href="#" className="btn btn-sm boton-calcular mt-auto">
              <i className="bx bx-folder me-1"></i>
              Consulta acá
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="caja-valor p-4 h-100 d-flex flex-column align-items-start">
            <h2 className="fs-5 mb-3">Liquidaciones de sueldo</h2>
            <div className="mb-3 w-100">
              <label htmlFor="sueldos" className="form-label fw-bold small">Seleccione una opción:</label>
              <select id="sueldos" className="form-select form-select-sm campo-formulario w-50">
                <option>Enero</option>
                <option>Febrero</option>
                <option>Marzo</option>
                <option>Abril</option>
                <option>Mayo</option>
                <option>Junio</option>
                <option>Julio</option>
                <option>Agosto</option>
                <option>Septiembre</option>
                <option>Octubre</option>
                <option>Noviembre</option>
                <option>Diciembre</option>
              </select>
            </div>
            <a href="#" className="btn btn-sm boton-calcular mt-auto">
              <i className="bx bx-folder me-1"></i>
              Consulta acá
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="caja-valor p-4 h-100 d-flex flex-column align-items-start">
            <h2 className="fs-5 mb-4">Certificado de antigüedad laboral</h2>
            <a href="#" className="btn btn-sm boton-calcular mt-auto">
              <i className="bx bx-folder me-1"></i>
              Consulta acá
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="caja-valor p-4 h-100 d-flex flex-column align-items-start">
            <h2 className="fs-5 mb-4">Reglamento interno</h2>
            <a href="#" className="btn btn-sm boton-calcular mt-auto">
              <i className="bx bx-folder me-1"></i>
              Consulta acá
            </a>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
 
export default DocumentosPersonales;