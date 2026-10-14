import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PanelLayout from '../components/PanelLayout'

const renderLayout = (props = {}, ruta = '/docente') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <PanelLayout {...props}>
        <p>Contenido de prueba</p>
      </PanelLayout>
    </MemoryRouter>
  )

describe('PanelLayout', () => {
  it('muestra header, menú lateral, contenido y footer', () => {
    renderLayout()

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar-nav')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Contenido de prueba')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('entrega el rol al header y aplica la clase de la sección', () => {
    renderLayout({ rol: 'Coordinador', claseEtiqueta: 'badge-coordinador', claseSeccion: 'py-5 seccion-prueba' })

    expect(screen.getByTestId('rol-badge')).toHaveTextContent('Coordinador')
    expect(screen.getByText('Contenido de prueba').closest('section')).toHaveClass('seccion-prueba')
  })

  it('usa la clase de sección por defecto cuando no se entrega ninguna', () => {
    renderLayout()

    expect(screen.getByText('Contenido de prueba').closest('section')).toHaveClass('py-4', 'px-4')
  })
})
