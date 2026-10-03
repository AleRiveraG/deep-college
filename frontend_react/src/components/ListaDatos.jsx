/**muestra todos los elementos para las pruebas unitarias
 */
function ListaDatos({
  items = [],
  mensajeVacio = 'No hay elementos en la lista',
  titulo = 'Listado',
}) {
  return (
    <div className="contenedor-lista" data-testid="contenedor-lista">
      {titulo && <h4 className="mb-3">{titulo}</h4>}
      {items.length === 0 ? (
        <p className="text-muted" data-testid="lista-vacia">
          {mensajeVacio}
        </p>
      ) : (
        <ul className="list-group" data-testid="lista-elementos">
          {items.map((item, index) => {
            const id = item.id !== undefined ? item.id : index;
            const texto = item.nombre || item.texto || item.titulo || String(item);
            return (
              <li
                key={id}
                className="list-group-item d-flex justify-content-between align-items-center"
                data-testid={`item-lista-${index}`}
              >
                <span>{texto}</span>
                {item.etiqueta && (
                  <span className="badge bg-secondary">{item.etiqueta}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ListaDatos;
