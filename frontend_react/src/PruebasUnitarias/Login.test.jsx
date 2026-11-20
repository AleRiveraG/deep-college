import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import { api } from '../services/api'

// se simula solo la llamada al backend, rutaPorRol se mantiene real
vi.mock('../services/api', async (importOriginal) => {
  const original = await importOriginal()
  return { ...original, api: vi.fn() }
})

const renderLogin = () =>
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/directiva" element={<p>Panel directiva</p>} />
        <Route path="/docente" element={<p>Panel docente</p>} />
        <Route path="/estudiante" element={<p>Panel estudiante</p>} />
        <Route path="/apoderado" element={<p>Panel apoderado</p>} />
      </Routes>
    </MemoryRouter>
  )

const iniciarSesion = (correo, contrasena) => {
  fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: correo } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: contrasena } })
  fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión|ingresando/i }).closest('form'))
}

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('CP-01: muestra error cuando el correo está vacío', () => {
    renderLogin()

    iniciarSesion('', 'clave1234')

    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')
    expect(api).not.toHaveBeenCalled()
  })

  it('CP-02: muestra error cuando la contraseña está vacía o es muy corta', () => {
    renderLogin()

    iniciarSesion('ana.perez@docente.deepcollege.cl', '')
    expect(screen.getByRole('alert')).toHaveTextContent('Contraseña no valida')

    iniciarSesion('ana.perez@docente.deepcollege.cl', '1234567')
    expect(screen.getByRole('alert')).toHaveTextContent('Contraseña no valida')
    expect(api).not.toHaveBeenCalled()
  })

  it('CP-03: rechaza un correo con formato inválido', () => {
    renderLogin()

    iniciarSesion('correo-sin-arroba', 'clave1234')
    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')

    iniciarSesion('correo@sinpunto', 'clave1234')
    expect(screen.getByRole('alert')).toHaveTextContent('Correo ingresado no valido')
    expect(api).not.toHaveBeenCalled()
  })

  it.each([
    ['DIRECTIVA', 'Panel directiva'],
    ['DOCENTE', 'Panel docente'],
    ['ESTUDIANTE', 'Panel estudiante'],
    ['APODERADO', 'Panel apoderado'],
  ])('CP-04: credenciales válidas con rol %s inician sesión y navegan al panel', async (rol, panel) => {
    const usuario = { id: 1, nombres: 'Ana', apellidos: 'Pérez' }
    api.mockResolvedValue({ token: 'token-123', rol, usuario })
    renderLogin()

    iniciarSesion('  ana.perez@colegio.cl  ', 'clave1234')

    expect(await screen.findByText(panel)).toBeInTheDocument()
    expect(api).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({ method: 'POST' }))
    expect(JSON.parse(api.mock.calls[0][1].body)).toEqual({
      correo: 'ana.perez@colegio.cl',
      contrasena: 'clave1234',
    })
    expect(localStorage.getItem('deepcollege.token')).toBe('token-123')
    expect(localStorage.getItem('deepcollege.rol')).toBe(rol)
    expect(JSON.parse(localStorage.getItem('deepcollege.usuario'))).toEqual(usuario)
  })

  it('CP-05: muestra el mensaje del servidor cuando las credenciales son incorrectas', async () => {
    api.mockRejectedValue(new Error('Credenciales incorrectas'))
    renderLogin()

    iniciarSesion('ana.perez@colegio.cl', 'clave1234')

    expect(await screen.findByRole('alert')).toHaveTextContent('Credenciales incorrectas')
    expect(localStorage.getItem('deepcollege.token')).toBeNull()
    expect(screen.queryByText('Panel directiva')).not.toBeInTheDocument()
  })

  it('CP-06: usa un mensaje por defecto cuando el error no trae texto', async () => {
    api.mockRejectedValue(new Error(''))
    renderLogin()

    iniciarSesion('ana.perez@colegio.cl', 'clave1234')

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudo iniciar sesión')
  })

  it('CP-07: rechaza un rol desconocido devuelto por el servidor', async () => {
    api.mockResolvedValue({ token: 'token-123', rol: 'ADMIN', usuario: {} })
    renderLogin()

    iniciarSesion('ana.perez@colegio.cl', 'clave1234')

    expect(await screen.findByRole('alert')).toHaveTextContent('rol no reconocido')
    expect(localStorage.getItem('deepcollege.token')).toBeNull()
    expect(screen.queryByText('Panel directiva')).not.toBeInTheDocument()
  })

  it('CP-08: deshabilita el botón y muestra "Ingresando…" mientras espera al servidor', async () => {
    let resolver
    api.mockReturnValue(new Promise((resolve) => { resolver = resolve }))
    renderLogin()

    iniciarSesion('ana.perez@colegio.cl', 'clave1234')

    const boton = await screen.findByRole('button', { name: /ingresando/i })
    expect(boton).toBeDisabled()

    resolver({ token: 't', rol: 'DOCENTE', usuario: {} })
    expect(await screen.findByText('Panel docente')).toBeInTheDocument()
  })

  it('oculta el mensaje de error cuando el usuario vuelve a escribir', () => {
    renderLogin()

    iniciarSesion('', 'clave1234')
    expect(screen.getByRole('alert')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Correo Electrónico'), { target: { value: 'a' } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    iniciarSesion('a@b.cl', '123')
    expect(screen.getByRole('alert')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '12345678' } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('vuelve a habilitar el botón cuando termina la petición con error', async () => {
    api.mockRejectedValue(new Error('Falló'))
    renderLogin()

    iniciarSesion('ana.perez@colegio.cl', 'clave1234')

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeEnabled()
    )
  })
})