import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar, { enlacesDocente, enlacesEstudiante, enlacesDirectiva } from '../components/NavBar'

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
})
