import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Boton from '../components/Boton'

describe('Boton', () => {
  it('muestra el texto recibido por props', () => {
    render(<Boton texto="Guardar Asistencia" />)

    expect(screen.getByRole('button')).toHaveTextContent('Guardar Asistencia')
  })

  it('ejecuta onClick al hacer clic y no lo ejecuta si está deshabilitado', () => {
    const onClick = vi.fn()
    const { rerender } = render(<Boton texto="Registrar" onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(<Boton texto="Registrar" onClick={onClick} deshabilitado />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('asigna el id recibido y el tipo submit', () => {
    render(<Boton id="btn-guardar" texto="Guardar" tipo="submit" />)

    const boton = screen.getByRole('button')
    expect(boton).toHaveAttribute('id', 'btn-guardar')
    expect(boton).toHaveAttribute('type', 'submit')
  })
})
