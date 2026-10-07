import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FooterPublico from '../components/FooterP'

describe('FooterP (footer público)', () => {
  it('muestra el logo, el lema y los datos de contacto', () => {
    render(<FooterPublico />)

    expect(screen.getByAltText('Logo Colegio')).toBeInTheDocument()
    expect(screen.getByText(/Formando líderes desde 1993/)).toBeInTheDocument()
    expect(screen.getByText(/\+56 9 9876 5432/)).toBeInTheDocument()
  })
})