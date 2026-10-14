import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/directiva" element={<p>Panel directiva</p>} />
        <Route path="/docente" element={<p>Panel docente</p>} />
        <Route path="/estudiante" element={<p>Panel estudiante</p>} />
      </Routes>
    </MemoryRouter>
  )

const iniciarSesion = (correo, contrasena) => {
  fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: correo } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: contrasena } })
  fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }).closest('form'))
}

describe('Login', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('CP-01: muestra error cuando el correo está vacío', () => {
    renderLogin()

    iniciarSesion('', 'clave1234')

    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')
  })

  it('CP-02: muestra error cuando la contraseña está vacía o es muy corta', () => {
    renderLogin()

    iniciarSesion('ana.perez@docente.deepcollege.cl', '')
    expect(screen.getByRole('alert')).toHaveTextContent('Contraseña no valida')

    iniciarSesion('ana.perez@docente.deepcollege.cl', '1234567')
    expect(screen.getByRole('alert')).toHaveTextContent('Contraseña no valida')
  })

  it('CP-03: rechaza un correo con formato inválido', () => {
    renderLogin()

    iniciarSesion('correo-sin-arroba', 'clave1234')

    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')
  })

  it.each([
    ['ana.perez@directiva.deepcollege.cl', 'Panel directiva'],
    ['ana.perez@docente.deepcollege.cl', 'Panel docente'],
    ['ana.perez@estudiante.deepcollege.cl', 'Panel estudiante'],
  ])('CP-04: credenciales válidas (%s) inician sesión y navegan al panel', (correo, panel) => {
    renderLogin()

    iniciarSesion(correo, 'clave1234')

    expect(window.alert).toHaveBeenCalledWith('Inicio de sesión exitoso!')
    expect(screen.getByText(panel)).toBeInTheDocument()
  })

  it('CP-05: rechaza credenciales de otro dominio o con un rol desconocido', () => {
    renderLogin()

    iniciarSesion('ana.perez@gmail.com', 'clave1234')
    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')

    iniciarSesion('ana.perez@admin.deepcollege.cl', 'clave1234')
    expect(screen.getByRole('alert')).toHaveTextContent('Correo no valido')
    expect(screen.queryByText('Panel directiva')).not.toBeInTheDocument()
  })

  it('oculta el mensaje de error cuando el usuario vuelve a escribir', () => {
    renderLogin()

    iniciarSesion('', 'clave1234')
    expect(screen.getByRole('alert')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'a' } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
