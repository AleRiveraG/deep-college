import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RutaProtegida from '../components/RutaProtegida'

const renderRuta = (roles, ruta = '/privada') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/login" element={<p>Pantalla login</p>} />
        <Route path="/" element={<p>Inicio público</p>} />
        <Route path="/directiva" element={<p>Panel directiva</p>} />
        <Route path="/docente" element={<p>Panel docente</p>} />
        <Route element={<RutaProtegida roles={roles} />}>
          <Route path="/privada" element={<p>Contenido privado</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )

const guardarSesion = (rol) => {
  localStorage.setItem('deepcollege.token', 'token-123')
  localStorage.setItem('deepcollege.rol', rol)
}

describe('RutaProtegida', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('redirige al login cuando no hay token', () => {
    renderRuta(['DIRECTIVA'])

    expect(screen.getByText('Pantalla login')).toBeInTheDocument()
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument()
  })

  it('muestra el contenido cuando el rol está permitido', () => {
    guardarSesion('DIRECTIVA')
    renderRuta(['DIRECTIVA'])

    expect(screen.getByText('Contenido privado')).toBeInTheDocument()
  })

  it('muestra el contenido cuando no se restringen roles', () => {
    guardarSesion('DOCENTE')
    renderRuta(undefined)

    expect(screen.getByText('Contenido privado')).toBeInTheDocument()
  })

  it('envía al usuario a su propio panel cuando su rol no tiene permiso', () => {
    guardarSesion('DOCENTE')
    renderRuta(['DIRECTIVA'])

    expect(screen.getByText('Panel docente')).toBeInTheDocument()
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument()
  })

  it('envía a la página de inicio cuando el rol guardado no es reconocido', () => {
    guardarSesion('ADMIN')
    renderRuta(['DIRECTIVA'])

    expect(screen.getByText('Inicio público')).toBeInTheDocument()
  })

  it('envía al login cuando hay token pero no hay rol guardado', () => {
    localStorage.setItem('deepcollege.token', 'token-123')
    renderRuta(['DIRECTIVA'])

    expect(screen.getByText('Pantalla login')).toBeInTheDocument()
  })
})