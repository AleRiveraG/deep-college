import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// limpia el dom después de cada prueba para que no se mezclen renders
afterEach(() => {
  cleanup()
})
