import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MensajeError from '../components/MensajeError'

describe('MensajeError', () => {
  it('no renderiza nada cuando no hay error', () => {
    render(<MensajeError error="" />)

    expect(screen.queryByTestId('mensaje-error')).not.toBeInTheDocument()
  })

  it('muestra el mensaje con role alert cuando hay un error', () => {
    render(<MensajeError error="Credenciales inválidas" />)

    const alerta = screen.getByRole('alert')
    expect(alerta).toHaveTextContent('Credenciales inválidas')
    expect(alerta).toHaveClass('alert-danger')
  })
})
