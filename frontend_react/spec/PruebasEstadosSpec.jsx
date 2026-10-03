import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Formulario from '../src/components/Formulario';
import Login from '../src/pages/Login';

describe('3. Pruebas de Estado (State)', () => {

  describe('Gestión del Estado en Formulario', () => {

    it('Tarea: el estado del formulario cambia correctamente cuando el usuario introduce texto en el campo nombre', () => {
      render(<Formulario />);

      const inputNombre = screen.getByTestId('input-nombre');
      expect(inputNombre.value).toBe('');

      //simula que se ingresa texto
      fireEvent.change(inputNombre, { target: { value: 'Profesor Marcelo Soto' } });

      //verfica que el campo se actualizado correctamente
      expect(inputNombre.value).toBe('Profesor Marcelo Soto');
    });

    it('Tarea: el estado del formulario cambia correctamente cuando el usuario introduce texto en el campo correo', () => {
      render(<Formulario />);

      const inputCorreo = screen.getByTestId('input-correo');
      expect(inputCorreo.value).toBe('');

      //simula que el usuario escribe su correo
      fireEvent.change(inputCorreo, { target: { value: 'm.soto@deepcollege.cl' } });

      //comprueba que el estado se actualizo
      expect(inputCorreo.value).toBe('m.soto@deepcollege.cl');
    });

    it('debe mantener estados independientes para múltiples campos de texto', () => {
      render(<Formulario />);

      const inputNombre = screen.getByTestId('input-nombre');
      const inputCorreo = screen.getByTestId('input-correo');

      fireEvent.change(inputNombre, { target: { value: 'Valentina Lagos' } });
      fireEvent.change(inputCorreo, { target: { value: 'v.lagos@deepcollege.cl' } });

      expect(inputNombre.value).toBe('Valentina Lagos');
      expect(inputCorreo.value).toBe('v.lagos@deepcollege.cl');
    });

    it('debe limpiar el estado de error al empezar a escribir nuevamente', () => {
      render(<Formulario />);

      //envia un formulario vacio para probar el error
      const formulario = screen.getByTestId('formulario-contacto');
      fireEvent.submit(formulario);

      //comprueba que el error se activo
      expect(screen.getByTestId('mensaje-error')).toBeDefined();

      //cuando se introzca texto en el error el error desaparece
      const inputNombre = screen.getByTestId('input-nombre');
      fireEvent.change(inputNombre, { target: { value: 'A' } });

      expect(screen.queryByTestId('mensaje-error')).toBeNull();
    });

  });

  describe('Gestión del Estado en Página de Login', () => {

    it('debe actualizar los estados de correo y contraseña al introducir texto', () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      );

      const inputCorreo = screen.getByPlaceholderText('Ingrese su correo electrónico');
      const inputPass = screen.getByPlaceholderText('Contraseña');

      expect(inputCorreo.value).toBe('');
      expect(inputPass.value).toBe('');

      //escribe en correo
      fireEvent.change(inputCorreo, { target: { value: 'docente@deepcollege.cl' } });
      expect(inputCorreo.value).toBe('docente@deepcollege.cl');

      // escribe en contraseña
      fireEvent.change(inputPass, { target: { value: 'claveSegura123' } });
      expect(inputPass.value).toBe('claveSegura123');
    });

  });

});
