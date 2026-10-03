import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Boton from '../src/components/Boton';
import Header from '../src/components/Header';

describe('2. Pruebas de Propiedades (Props)', () => {

  describe('Componente Botón (Propiedades Recibidas)', () => {

    it('Tarea: recibe correctamente la etiqueta (texto) especificada', () => {
      const etiquetaBoton = 'Guardar Asistencia';
      render(<Boton texto={etiquetaBoton} />);

      const boton = screen.getByRole('button');
      expect(boton.textContent).toContain(etiquetaBoton);
    });

    it('Tarea: recibe correctamente la función de evento onClick y la ejecuta al interactuar', () => {
      const funcionEspia = jasmine.createSpy('onClickHandler');
      render(<Boton texto="Registrar Calificación" onClick={funcionEspia} />);

      const boton = screen.getByRole('button');
      fireEvent.click(boton);

      expect(funcionEspia).toHaveBeenCalledTimes(1);
    });

    it('recibe y aplica correctamente la propiedad de clase CSS personalizada', () => {
      render(<Boton texto="Eliminar" clase="btn btn-danger btn-sm" />);

      const boton = screen.getByRole('button');
      expect(boton.className).toContain('btn-danger');
      expect(boton.className).toContain('btn-sm');
    });

    it('recibe y aplica la propiedad deshabilitado (disabled)', () => {
      const clickEspia = jasmine.createSpy('disabledClickHandler');
      render(<Boton texto="Procesando..." deshabilitado={true} onClick={clickEspia} />);

      const boton = screen.getByRole('button');
      expect(boton.disabled).toBe(true);

      fireEvent.click(boton);
      //esto es para verificar que no permita que se ejcuten eventos en botones que no esta habilitados
      expect(clickEspia).not.toHaveBeenCalled();
    });

    it('recibe y aplica la propiedad de tipo (type) submit o button', () => {
      const { rerender } = render(<Boton texto="Enviar" tipo="submit" />);
      expect(screen.getByRole('button').getAttribute('type')).toBe('submit');

      rerender(<Boton texto="Cancelar" tipo="reset" />);
      expect(screen.getByRole('button').getAttribute('type')).toBe('reset');
    });

  });

  describe('Componente Header (Propiedades Recibidas)', () => {

    it('recibe correctamente las propiedades rol y claseEtiqueta', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Header rol="Coordinador Académico" claseEtiqueta="badge-coordinador" />
        </MemoryRouter>
      );

      const badge = screen.getByTestId('rol-badge');
      expect(badge.textContent).toBe('Coordinador Académico');
      expect(badge.className).toContain('badge-coordinador');
    });

    it('recibe la propiedad onLogout para el botón de cierre de sesión', () => {
      const logoutEspia = jasmine.createSpy('logoutHandler');
      render(
        <MemoryRouter initialEntries={['/']}>
          <Header rol="Directiva" onLogout={logoutEspia} />
        </MemoryRouter>
      );

      const botonCerrar = screen.getByTestId('btn-cerrar-sesion');
      fireEvent.click(botonCerrar);

      expect(logoutEspia).toHaveBeenCalledTimes(1);
    });

  });

});
