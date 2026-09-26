import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from "./pages/docente/PaginaPrincipal"
import MiPerfil from "./pages/docente/MiPerfil"
import RegistroAsistencia from "./pages/docente/RegistroAsistencia"
import RegistroNotas from "./pages/docente/RegistroNotas"
import VerPerfiles from "./pages/docente/VerPerfiles"
import DocumentosPersonales from "./pages/docente/DocumentosPersonales"



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/docente" element={<PaginaPrincipal />}/>
          <Route path="/docente/perfil" component={MiPerfil} />
          <Route path="/docente/perfiles" component={VerPerfiles} />
          <Route path="/docente/asistencia" component={RegistroAsistencia} />
          <Route path="/docente/notas" component={RegistroNotas} />
          <Route path="/docente/documentos" component={DocumentosPersonales} />
        </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App
