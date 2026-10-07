import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

describe('Footer', () => {
  it('muestra el logo, el lema y los datos de contacto', () => {
    render(<Footer />)

    expect(screen.getByAltText('Logo Colegio')).toBeInTheDocument()
    expect(screen.getByText(/Formando líderes desde 1993/)).toBeInTheDocument()
    expect(screen.getByText(/correo.ejemplo@colegio.cl/)).toBeInTheDocument()
  })
})