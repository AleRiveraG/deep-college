import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Formulario from '../components/Formulario'

const llenar = (nombre, correo) => {
  fireEvent.change(screen.getByTestId('input-nombre'), { target: { value: nombre } })
  fireEvent.change(screen.getByTestId('input-correo'), { target: { value: correo } })
}

describe('Formulario', () => {
  it('actualiza los campos al escribir', () => {
    render(<Formulario />)

    llenar('Valentina Lagos', 'v.lagos@deepcollege.cl')

    expect(screen.getByTestId('input-nombre')).toHaveValue('Valentina Lagos')
    expect(screen.getByTestId('input-correo')).toHaveValue('v.lagos@deepcollege.cl')
  })

  it('muestra error si se envía con el nombre vacío', () => {
    render(<Formulario />)

    fireEvent.click(screen.getByRole('button', { name: /enviar información/i }))

    expect(screen.getByTestId('mensaje-error')).toHaveTextContent('El nombre es obligatorio')
  })

  it('envía los datos al callback y muestra la confirmación', () => {
    const onSubmitExitoso = vi.fn()
    render(<Formulario onSubmitExitoso={onSubmitExitoso} />)

    llenar('Andrea Castro', 'a.castro@deepcollege.cl')
    fireEvent.click(screen.getByRole('button', { name: /enviar información/i }))

    expect(onSubmitExitoso).toHaveBeenCalledWith({
      nombre: 'Andrea Castro',
      correo: 'a.castro@deepcollege.cl',
    })
    expect(screen.getByTestId('mensaje-exito')).toHaveTextContent('Andrea Castro')
  })
})
