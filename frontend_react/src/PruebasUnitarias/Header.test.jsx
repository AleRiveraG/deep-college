import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/Header'

const renderHeader = (props, ruta = '/') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Header {...props} />
    </MemoryRouter>
  )

describe('Header', () => {
  it('muestra el rol y la clase recibidos por props', () => {
    renderHeader({ rol: 'Coordinador', claseEtiqueta: 'badge-coordinador' })

    const badge = screen.getByTestId('rol-badge')
    expect(badge).toHaveTextContent('Coordinador')
    expect(badge).toHaveClass('badge-coordinador')
  })

  it('ejecuta onLogout al hacer clic en cerrar sesión', () => {
    const onLogout = vi.fn()
    renderHeader({ rol: 'Directiva', onLogout })

    fireEvent.click(screen.getByTestId('btn-cerrar-sesion'))

    expect(onLogout).toHaveBeenCalledTimes(1)
  })
  it('deduce el rol desde la ruta cuando no se entrega por props', () => {
    const casos = [
      ['/docente/notas', 'Docente'],
      ['/estudiante/notas', 'Estudiante'],
      ['/directiva', 'Directiva'],
      ['/login', 'Colegio'],
    ]

    casos.forEach(([ruta, esperado]) => {
      const { unmount } = renderHeader({}, ruta)
      expect(screen.getByTestId('rol-badge')).toHaveTextContent(esperado)
      unmount()
    })
  })
})
