import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar, { enlacesDocente } from '../components/NavBar'

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
})
