import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SelectorPupilo from '../components/SelectorPupilo'

const pupilos = [
  { id: 1, nombres: 'Juan', apellidos: 'Soto', curso: '1-medio' },
  { id: 2, nombres: 'Ana', apellidos: 'Soto' },
]

describe('SelectorPupilo', () => {
  it('muestra un mensaje de carga mientras se obtienen los pupilos', () => {
    render(<SelectorPupilo pupilos={[]} pupiloId="" setPupiloId={() => {}} cargando />)

    expect(screen.getByText(/Cargando tus pupilos/)).toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
  })

  it('avisa cuando el apoderado no tiene estudiantes asociados', () => {
    render(<SelectorPupilo pupilos={[]} pupiloId="" setPupiloId={() => {}} cargando={false} />)

    expect(screen.getByText(/No hay estudiantes asociados/)).toBeInTheDocument()
  })

  it('lista a los pupilos y muestra el curso solo cuando existe', () => {
    render(<SelectorPupilo pupilos={pupilos} pupiloId="1" setPupiloId={() => {}} cargando={false} />)

    expect(screen.getByRole('option', { name: 'Juan Soto - 1-medio' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Ana Soto' })).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveValue('1')
  })

  it('llama a setPupiloId con el id elegido', () => {
    const setPupiloId = vi.fn()
    render(<SelectorPupilo pupilos={pupilos} pupiloId="1" setPupiloId={setPupiloId} cargando={false} />)

    fireEvent.change(screen.getByLabelText(/Alumno/), { target: { value: '2' } })

    expect(setPupiloId).toHaveBeenCalledWith('2')
  })
})