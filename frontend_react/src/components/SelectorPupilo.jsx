function SelectorPupilo({ pupilos, pupiloId, setPupiloId, cargando }) {
  if (cargando) {
    return <div className="alert alert-secondary">Cargando tus pupilos…</div>;
  }

  if (!pupilos.length) {
    return (
      <div className="alert alert-info">
        No hay estudiantes asociados a esta cuenta de apoderado.
      </div>
    );
  }

  return (
    <div className="tarjeta-blanca p-3 border rounded mb-4 d-flex flex-wrap align-items-center gap-3">
      <label htmlFor="selector-alumno" className="form-label etiqueta-input fw-bold mb-0">
        <i className="bx bx-user me-2 icono-perfil"></i>Alumno
      </label>

      <select
        id="selector-alumno"
        className="form-select campo-formulario w-auto flex-grow-1"
        style={{ maxWidth: '420px' }}
        value={pupiloId}
        onChange={(evento) => setPupiloId(evento.target.value)}
      >
        {pupilos.map((pupilo) => (
          <option key={pupilo.id} value={String(pupilo.id)}>
            {pupilo.nombres} {pupilo.apellidos}
            {pupilo.curso ? ` - ${pupilo.curso}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectorPupilo;