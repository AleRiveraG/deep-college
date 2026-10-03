import { useState } from 'react';
import Boton from './Boton';
import MensajeError from './MensajeError';

/**
 * Componente Formulario para pruebas de estado, eventos, pruebas visuales
 */
function Formulario({ onSubmitExitoso, titulo = 'Formulario de Contacto' }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value);
    if (error) setError('');
  };

  const manejarCambioCorreo = (e) => {
    setCorreo(e.target.value);
    if (error) setError('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!correo.trim() || !correo.includes('@')) {
      setError('El correo no es válido');
      return;
    }

    setError('');
    setEnviado(true);

    if (onSubmitExitoso) {
      onSubmitExitoso({ nombre, correo });
    }
  };

  const resetearFormulario = () => {
    setNombre('');
    setCorreo('');
    setError('');
    setEnviado(false);
  };

  return (
    <div className="card p-4" data-testid="formulario-contenedor">
      <h3 className="mb-3">{titulo}</h3>

      {/* Renderizado condicional del mensaje de error */}
      <MensajeError error={error} />

      {/* Renderizado condicional de confirmación de envío */}
      {enviado ? (
        <div className="alert alert-success" data-testid="mensaje-exito">
          <p>¡Formulario enviado correctamente para {nombre}!</p>
          <Boton
            texto="Enviar otro"
            onClick={resetearFormulario}
            clase="btn btn-sm btn-outline-success"
          />
        </div>
      ) : (
        <form onSubmit={manejarEnvio} data-testid="formulario-contacto">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              id="nombre"
              type="text"
              className="form-control"
              placeholder="Ingrese su nombre"
              value={nombre}
              onChange={manejarCambioNombre}
              data-testid="input-nombre"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="correo" className="form-label">
              Correo Electrónico:
            </label>
            <input
              id="correo"
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.cl"
              value={correo}
              onChange={manejarCambioCorreo}
              data-testid="input-correo"
            />
          </div>

          <Boton
            tipo="submit"
            texto="Enviar Información"
            clase="btn btn-primary w-100"
          />
        </form>
      )}
    </div>
  );
}

export default Formulario;
