/**para las pruebas unitarias: muestra mensaje solo si hay error
 */
function MensajeError({ error, tipo = 'danger' }) {
  if (!error) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`alert alert-${tipo} d-flex align-items-center mt-2`}
      data-testid="mensaje-error"
    >
      <i className="bx bx-error-circle me-2 fs-5"></i>
      <span>{error}</span>
    </div>
  );
}

export default MensajeError;
