/**boton para las pruebas de propiedades
 */
function Boton({
  texto = 'Aceptar',
  onClick,
  tipo = 'button',
  clase = 'btn btn-primary',
  deshabilitado = false,
  icono = null,
}) {
  return (
    <button
      type={tipo}
      className={clase}
      onClick={onClick}
      disabled={deshabilitado}
      data-testid="boton"
    >
      {icono && <i className={`${icono} me-2`}></i>}
      <span>{texto}</span>
    </button>
  );
}

export default Boton;
