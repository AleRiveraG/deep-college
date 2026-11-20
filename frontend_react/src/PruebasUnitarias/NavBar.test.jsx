import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar, {
  enlacesDocente,
  enlacesEstudiante,
  enlacesDirectiva,
  enlacesApoderado,
} from '../components/NavBar'

const renderNavBar = (ui, ruta = '/') =>
  render(<MemoryRouter initialEntries={[ruta]}>{ui}</MemoryRouter>)

describe('NavBar', () => {
  it('muestra los enlaces según el rol recibido', () => {
    renderNavBar(<NavBar rol="docente" />)

    expect(screen.getAllByRole('link')).toHaveLength(enlacesDocente.length)
    expect(screen.getByText('Ver perfiles')).toBeInTheDocument()
  })

  it('marca como activo solo el enlace de la ruta actual', () => {
    renderNavBar(<NavBar rol="estudiante" />, '/estudiante/notas')

    expect(screen.getByRole('link', { name: 'Notas' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Horario' })).not.toHaveClass('active')
  })
  it('elige los enlaces según la ruta cuando no recibe rol', () => {
    const casos = [
      ['/docente', enlacesDocente.length],
      ['/estudiante', enlacesEstudiante.length],
      ['/', enlacesDirectiva.length],
    ]

    casos.forEach(([ruta, cantidad]) => {
      const { unmount } = renderNavBar(<NavBar />, ruta)
      expect(screen.getAllByRole('link')).toHaveLength(cantidad)
      unmount()
    })
  })

  it('el menú de directiva ya no incluye "Gestión académica" y sí las opciones nuevas', () => {
    renderNavBar(<NavBar rol="directiva" />, '/directiva')

    expect(screen.queryByText('Gestión académica')).not.toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(enlacesDirectiva.length)
    expect(enlacesDirectiva.some((e) => e.ruta === '/directiva/gestion-academica')).toBe(false)
    expect(screen.getByRole('link', { name: 'Solicitudes de admisión' })).toHaveAttribute('href', '/directiva/solicitudes')
    expect(screen.getByRole('link', { name: 'Crear cuenta docente' })).toHaveAttribute('href', '/directiva/crear-cuenta-docente')
  })

  it('muestra los enlaces de apoderado cuando la ruta empieza con /apoderado', () => {
    renderNavBar(<NavBar />, '/apoderado/notas')

    expect(screen.getAllByRole('link')).toHaveLength(enlacesApoderado.length)
    expect(screen.getByRole('link', { name: 'Notas' })).toHaveClass('active')
  })

  it('usa los enlaces de directiva al recibir rol directiva aunque la ruta sea otra', () => {
    renderNavBar(<NavBar rol="directiva" />, '/docente')

    expect(screen.getByRole('link', { name: 'Calculadora de sueldos' })).toBeInTheDocument()
  })

  it('prioriza la lista items recibida por props', () => {
    const items = [{ ruta: '/x', icono: 'bx-home', iconoClase: 'icono-inicio', texto: 'Solo uno' }]
    renderNavBar(<NavBar rol="docente" items={items} />)

    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: 'Solo uno' })).toHaveAttribute('href', '/x')
  })
})