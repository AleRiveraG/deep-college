import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ListaDatos from '../components/ListaDatos'

describe('ListaDatos', () => {
  it('renderiza el título y todos los elementos recibidos', () => {
    const items = [
      { id: 1, nombre: 'Ana Morales', etiqueta: 'Directiva' },
      { id: 2, nombre: 'Carlos Ruiz', etiqueta: 'Docente' },
    ]
    render(<ListaDatos items={items} titulo="Nómina Académica" />)

    expect(screen.getByText('Nómina Académica')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Ana Morales')).toBeInTheDocument()
  })

  it('muestra el mensaje alternativo cuando la lista está vacía', () => {
    render(<ListaDatos items={[]} mensajeVacio="No existen registros" />)

    expect(screen.getByTestId('lista-vacia')).toHaveTextContent('No existen registros')
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })
})
