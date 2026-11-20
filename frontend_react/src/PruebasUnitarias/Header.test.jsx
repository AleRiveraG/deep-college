import { describe, it, expect, vi, beforeEach } from 'vitest'
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
  beforeEach(() => {
    localStorage.clear()
  })

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

  it('cerrar sesión borra token, rol y usuario guardados en el navegador', () => {
    localStorage.setItem('deepcollege.token', 'abc')
    localStorage.setItem('deepcollege.rol', 'DIRECTIVA')
    localStorage.setItem('deepcollege.usuario', '{"id":1}')
    renderHeader({ rol: 'Directiva' })

    fireEvent.click(screen.getByTestId('btn-cerrar-sesion'))

    expect(localStorage.getItem('deepcollege.token')).toBeNull()
    expect(localStorage.getItem('deepcollege.rol')).toBeNull()
    expect(localStorage.getItem('deepcollege.usuario')).toBeNull()
  })

  it('cerrar sesión funciona aunque no se entregue onLogout', () => {
    renderHeader({ rol: 'Docente' })

    expect(() => fireEvent.click(screen.getByTestId('btn-cerrar-sesion'))).not.toThrow()
  })

  it('el botón de cerrar sesión enlaza a la ruta indicada o a / por defecto', () => {
    const { unmount } = renderHeader({ rol: 'Docente' })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
    unmount()

    renderHeader({ rol: 'Docente', logoutPath: '/login' })
    expect(screen.getByRole('link')).toHaveAttribute('href', '/login')
  })

  it('usa la clase de etiqueta propia de cada rol deducido desde la ruta', () => {
    const casos = [
      ['/docente', 'rol-docente'],
      ['/estudiante', 'rol-estudiante'],
      ['/directiva', 'etiqueta-directiva'],
    ]

    casos.forEach(([ruta, clase]) => {
      const { unmount } = renderHeader({}, ruta)
      expect(screen.getByTestId('rol-badge')).toHaveClass(clase)
      unmount()
    })
  })
})