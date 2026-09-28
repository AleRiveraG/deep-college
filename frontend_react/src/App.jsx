import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PaginaPrincipal from './pages/estudiante/PaginaPrincipal'
import Asistencia from './pages/estudiante/Asistencia'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/estudiante" element={<PaginaPrincipal/>} />
          <Route path="/estudiante/asistencia" element={<Asistencia/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
