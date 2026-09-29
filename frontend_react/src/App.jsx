import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import PaginaPrincipal from './pages/estudiante/PaginaPrincipal'
import Asistencia from './pages/estudiante/Asistencia'
import Horario from './pages/estudiante/Horario'
import MiPerfil from './pages/estudiante/MiPerfil'
import Notas from './pages/estudiante/Notas'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/estudiante" element={<PaginaPrincipal/>} />
          <Route path="/estudiante/asistencia" element={<Asistencia/>} />
          <Route path="/estudiante/horario" element={<Horario/>} />
          <Route path='/estudiante/perfil' element={<MiPerfil/>}/>
          <Route path='/estudiante/notas' element={<Notas/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
