import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DatosAcademicosDemo from '../components/DatosAcademicosDemo'
import { api, apiAcademico } from '../services/api'

vi.mock('../services/api', () => ({
  api: vi.fn(),
  apiAcademico: vi.fn(),
}))

const estudiante = { id: 1, nombres: 'Juan', apellidos: 'Soto', curso: '1-medio' }

// respuestas del backend académico según la ruta pedida
const datosAcademicos = {
  notas: [{ asignatura: 'Matemática', ES: [6, 6], EF: [6], ED: [6] }],
  asistencia: { totalClases: 10, inasistencias: ['2026-03-02'] },
  horario: [{ modulo: '08:00 - 08:45', clases: ['Matemática', 'Lenguaje', 'Historia', 'Ciencias', 'Arte'] }],
}

function simularAcademico() {
  apiAcademico.mockImplementation((ruta) => {
    if (ruta.endsWith('/notas')) return Promise.resolve(datosAcademicos.notas)
    if (ruta.endsWith('/asistencia')) return Promise.resolve(datosAcademicos.asistencia)
    return Promise.resolve(datosAcademicos.horario)
  })
}

const renderDatos = (rol, vista, ruta = '/estudiante') =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <DatosAcademicosDemo rol={rol} vista={vista} />
    </MemoryRouter>
  )

describe('DatosAcademicosDemo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    simularAcademico()
  })

  it('estudiante: muestra sus notas, el promedio de la asignatura y las ponderaciones', async () => {
    api.mockResolvedValue(estudiante)
    renderDatos('ESTUDIANTE', 'notas', '/estudiante/notas')

    expect(screen.getByRole('heading', { name: 'Mis Notas' })).toBeInTheDocument()
    expect(await screen.findByText('Matemática')).toBeInTheDocument()

    expect(api).toHaveBeenCalledWith('/api/usuarios/me')
    expect(apiAcademico).toHaveBeenCalledWith('/api/academico/estudiantes/1/notas')
    // promedio general y promedio de la asignatura
    expect(screen.getAllByText('6.0')).toHaveLength(2)
    // casillas sin nota se muestran con guion
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    expect(screen.getByText(/Sumativa 35%, Formativa 35% y/)).toBeInTheDocument()
  })

  it('estudiante: muestra el porcentaje de asistencia y el detalle de inasistencias', async () => {
    api.mockResolvedValue(estudiante)
    renderDatos('ESTUDIANTE', 'asistencia', '/estudiante/asistencia')

    expect(await screen.findByText('90%')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mi asistencia' })).toBeInTheDocument()
    expect(screen.getByText('Total Clases')).toBeInTheDocument()
    expect(screen.getByText('Detalle de inasistencias')).toBeInTheDocument()
    expect(screen.getByText(/Ausente/)).toBeInTheDocument()
    expect(screen.getByText(/asistencia mínima exigida es del 70%/)).toBeInTheDocument()
  })

  it('estudiante: muestra su horario pidiendo el horario del curso', async () => {
    api.mockResolvedValue(estudiante)
    renderDatos('ESTUDIANTE', 'horario', '/estudiante/horario')

    expect(await screen.findByText('08:00 - 08:45')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mi horario' })).toBeInTheDocument()
    expect(screen.getByText('Lunes')).toBeInTheDocument()
    expect(screen.getByText('Ciencias')).toBeInTheDocument()
    expect(apiAcademico).toHaveBeenCalledWith('/api/academico/cursos/1-medio/horario')
  })

  it('apoderado: usa títulos propios, lista a los pupilos y cambia de alumno', async () => {
    api.mockResolvedValue([
      estudiante,
      { id: 2, nombres: 'Ana', apellidos: 'Soto', curso: '3-basico' },
    ])
    renderDatos('APODERADO', 'notas', '/apoderado/notas')

    expect(screen.getByRole('heading', { name: 'Notas del alumno' })).toBeInTheDocument()
    expect(await screen.findByRole('option', { name: 'Ana Soto - 3-basico' })).toBeInTheDocument()
    expect(api).toHaveBeenCalledWith('/api/apoderados/me/pupilos')
    expect(await screen.findByText('Matemática')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Alumno'), { target: { value: '2' } })

    await waitFor(() =>
      expect(apiAcademico).toHaveBeenCalledWith('/api/academico/estudiantes/2/notas')
    )
  })

  it('apoderado: avisa cuando la cuenta no tiene estudiantes asociados', async () => {
    api.mockResolvedValue([])
    renderDatos('APODERADO', 'asistencia', '/apoderado/asistencia')

    expect(await screen.findByText('Esta cuenta no tiene estudiantes asociados.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Asistencia del alumno' })).toBeInTheDocument()
    expect(apiAcademico).not.toHaveBeenCalled()
  })

  it('muestra el error cuando falla la carga del perfil', async () => {
    api.mockRejectedValue(new Error('Sesión expirada'))
    renderDatos('ESTUDIANTE', 'notas', '/estudiante/notas')

    expect(await screen.findByText('Sesión expirada')).toBeInTheDocument()
  })

  it('muestra el error cuando falla la carga de los datos académicos', async () => {
    api.mockResolvedValue(estudiante)
    apiAcademico.mockRejectedValue(new Error('Servicio académico no disponible'))
    renderDatos('ESTUDIANTE', 'notas', '/estudiante/notas')

    expect(await screen.findByText('Servicio académico no disponible')).toBeInTheDocument()
  })

  it('muestra "Cargando…" mientras se espera la respuesta del perfil', () => {
    api.mockReturnValue(new Promise(() => {}))
    renderDatos('ESTUDIANTE', 'horario', '/estudiante/horario')

    expect(screen.getByText('Cargando…')).toBeInTheDocument()
  })
})