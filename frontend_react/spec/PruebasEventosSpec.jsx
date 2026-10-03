import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Boton from '../src/components/Boton';
import Formulario from '../src/components/Formulario';
import Header from '../src/components/Header';

describe('4. Pruebas de Eventos', () => {

  describe('Simulación de Eventos: Ejecución de una función específica', () => {

    it('Tarea: simula un clic en un botón y comprueba que se ejecute la función específica provista', () => {
      const funcionAccion = jasmine.createSpy('funcionAccion');
      render(<Boton texto="Guardar Registro" onClick={funcionAccion} />);

      const boton = screen.getByRole('button');
      
      //simula click de usuarios
      fireEvent.click(boton);

      //comprueba que la funcion especifica fue llamada
      expect(funcionAccion).toHaveBeenCalledTimes(1);
    });

    it('debe enviar los datos del estado a la función callback al enviar el formulario válido', () => {
      const callbackExitoso = jasmine.createSpy('onSubmitExitoso');
      render(<Formulario onSubmitExitoso={callbackExitoso} />);

      const inputNombre = screen.getByTestId('input-nombre');
      const inputCorreo = screen.getByTestId('input-correo');
      const botonEnviar = screen.getByRole('button', { name: /enviar información/i });

      //llena los campos
      fireEvent.change(inputNombre, { target: { value: 'Andrea Castro' } });
      fireEvent.change(inputCorreo, { target: { value: 'a.castro@deepcollege.cl' } });

      //simula clicks en enviar
      fireEvent.click(botonEnviar);

      //verifica que la funcion se haya ejecutado con los datos capturados
      expect(callbackExitoso).toHaveBeenCalledWith({
        nombre: 'Andrea Castro',
        correo: 'a.castro@deepcollege.cl',
      });
    });

    it('debe ejecutar la función onLogout al hacer clic en el botón de cerrar sesión en Header', () => {
      const onLogoutSpy = jasmine.createSpy('onLogout');
      render(
        <MemoryRouter initialEntries={['/docente']}>
          <Header onLogout={onLogoutSpy} />
        </MemoryRouter>
      );

      const botonCerrar = screen.getByTestId('btn-cerrar-sesion');
      fireEvent.click(botonCerrar);

      expect(onLogoutSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('Simulación de Eventos: Cambio de estado provocado por el clic', () => {

    it('Tarea: simula un clic en el botón y comprueba que el estado del componente cambie a enviado: true', () => {
      render(<Formulario />);

      //formulario vacio y sin texto al principio
      expect(screen.queryByTestId('mensaje-exito')).toBeNull();
      expect(screen.getByTestId('formulario-contacto')).toBeDefined();

      //completa los datos que se necesitan
      fireEvent.change(screen.getByTestId('input-nombre'), { target: { value: 'Estudiante Prueba' } });
      fireEvent.change(screen.getByTestId('input-correo'), { target: { value: 'estudiante@deepcollege.cl' } });

      //simula click en boton enviar
      const botonEnviar = screen.getByRole('button', { name: /enviar información/i });
      fireEvent.click(botonEnviar);

      //comprueba que el estado cambio y se oculta el formulario y se muestra pantalla de exito
      expect(screen.queryByTestId('formulario-contacto')).toBeNull();
      const mensajeExito = screen.getByTestId('mensaje-exito');
      expect(mensajeExito).toBeDefined();
      expect(mensajeExito.textContent).toContain('¡Formulario enviado correctamente para Estudiante Prueba!');
    });

    it('simula clic en el botón "Enviar otro" y comprueba que el estado se restablezca', () => {
      render(<Formulario />);

      //envia formulario primero
      fireEvent.change(screen.getByTestId('input-nombre'), { target: { value: 'Docente Juan' } });
      fireEvent.change(screen.getByTestId('input-correo'), { target: { value: 'juan@deepcollege.cl' } });
      fireEvent.click(screen.getByRole('button', { name: /enviar información/i }));

      expect(screen.getByTestId('mensaje-exito')).toBeDefined();

      //simula click en enviar otro
      const botonReset = screen.getByRole('button', { name: /enviar otro/i });
      fireEvent.click(botonReset);

      // formulario de exito vacio y pantalla de exito no aparece
      expect(screen.queryByTestId('mensaje-exito')).toBeNull();
      expect(screen.getByTestId('formulario-contacto')).toBeDefined();
      expect(screen.getByTestId('input-nombre').value).toBe('');
      expect(screen.getByTestId('input-correo').value).toBe('');
    });

    it('simula clic con datos vacíos y comprueba que el estado de error cambie y muestre el mensaje', () => {
      render(<Formulario />);

      //click sin mandar datos
      const botonEnviar = screen.getByRole('button', { name: /enviar información/i });
      fireEvent.click(botonEnviar);

      //verifica que el estado de error cambio
      const errorAlerta = screen.getByTestId('mensaje-error');
      expect(errorAlerta).toBeDefined();
      expect(errorAlerta.textContent).toContain('El nombre es obligatorio');
    });

  });

});
