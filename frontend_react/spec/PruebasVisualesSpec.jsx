import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListaDatos from '../src/components/ListaDatos';
import NavBar, { enlacesDirectiva, enlacesDocente, enlacesEstudiante } from '../src/components/NavBar';
import MensajeError from '../src/components/MensajeError';

describe('1. Pruebas de Renderizado', () => {

  describe('Renderizado correcto (Listas con datos proporcionados)', () => {

    it('Tarea: debe renderizar todos los elementos de un conjunto de datos en ListaDatos', () => {
      const estudiantes = [
        { id: 1, nombre: 'Ana Morales', etiqueta: 'Directiva' },
        { id: 2, nombre: 'Carlos Ruiz', etiqueta: 'Docente' },
        { id: 3, nombre: 'Beatriz Silva', etiqueta: 'Estudiante' },
        { id: 4, nombre: 'Daniel Vega', etiqueta: 'Docente' },
      ];

      render(<ListaDatos items={estudiantes} titulo="Nómina Académica" />);

      //Verifica que el título se renderice
      expect(screen.getByText('Nómina Académica')).toBeDefined();

      //verifica que el número total de elementos renderizados coincida exactamente
      const itemsRenderizados = screen.getAllByRole('listitem');
      expect(itemsRenderizados.length).toBe(4);

      //verifica que cada elemento por separado aparezca con su texto
      estudiantes.forEach((estudiante) => {
        expect(screen.getByText(estudiante.nombre)).toBeDefined();
        expect(screen.getAllByText(estudiante.etiqueta).length).toBeGreaterThan(0);
      });
    });

    it('debe renderizar el mensaje alternativo cuando la lista está vacía', () => {
      render(<ListaDatos items={[]} mensajeVacio="No existen registros en el sistema" />);

      const mensaje = screen.getByTestId('lista-vacia');
      expect(mensaje.textContent).toContain('No existen registros en el sistema');
      expect(screen.queryByRole('list')).toBeNull();
    });

    it('debe renderizar todos los enlaces de navegación según el rol en NavBar', () => {
      render(
        <MemoryRouter initialEntries={['/docente']}>
          <NavBar rol="docente" />
        </MemoryRouter>
      );

      //lso enlaces que hay en docente son 6
      const enlaces = screen.getAllByRole('link');
      expect(enlaces.length).toBe(enlacesDocente.length);

      enlacesDocente.forEach((enlace) => {
        expect(screen.getByText(enlace.texto)).toBeDefined();
      });
    });

    it('debe renderizar todos los elementos de un conjunto de enlaces personalizado en NavBar', () => {
      const itemsPersonalizados = [
        { ruta: '/custom-1', icono: 'bx-star', iconoClase: 'icono-1', texto: 'Opción 1' },
        { ruta: '/custom-2', icono: 'bx-cog', iconoClase: 'icono-2', texto: 'Opción 2' },
        { ruta: '/custom-3', icono: 'bx-bell', iconoClase: 'icono-3', texto: 'Opción 3' },
      ];

      render(
        <MemoryRouter initialEntries={['/']}>
          <NavBar items={itemsPersonalizados} />
        </MemoryRouter>
      );

      const enlaces = screen.getAllByRole('link');
      expect(enlaces.length).toBe(3);
      expect(screen.getByText('Opción 1')).toBeDefined();
      expect(screen.getByText('Opción 2')).toBeDefined();
      expect(screen.getByText('Opción 3')).toBeDefined();
    });

  });

  describe('Renderizado condicional (Mensajes y elementos según condiciones)', () => {

    it('Tarea: NO debe renderizar el mensaje de error cuando error es null, undefined o vacío', () => {
      const { rerender } = render(<MensajeError error={null} />);
      expect(screen.queryByTestId('mensaje-error')).toBeNull();

      rerender(<MensajeError error={undefined} />);
      expect(screen.queryByTestId('mensaje-error')).toBeNull();

      rerender(<MensajeError error="" />);
      expect(screen.queryByTestId('mensaje-error')).toBeNull();
    });

    it('Tarea: DEBE mostrar el mensaje de error solo cuando hay un error presente', () => {
      const errorTexto = 'Las credenciales ingresadas son inválidas';
      render(<MensajeError error={errorTexto} tipo="danger" />);

      const alerta = screen.getByTestId('mensaje-error');
      expect(alerta).toBeDefined();
      expect(alerta.textContent).toContain(errorTexto);
      expect(alerta.getAttribute('role')).toBe('alert');
      expect(alerta.className).toContain('alert-danger');
    });

    it('debe ocultar el mensaje de error si la propiedad de error cambia de texto a vacío', () => {
      const { rerender } = render(<MensajeError error="Error inicial" />);
      expect(screen.getByTestId('mensaje-error')).toBeDefined();

      // Se limpia el error (condición cambia a falso)
      rerender(<MensajeError error="" />);
      expect(screen.queryByTestId('mensaje-error')).toBeNull();
    });

  });

});
