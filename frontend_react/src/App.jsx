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
          <Route path="/docente/perfil" element={<MiPerfil />} />
          <Route path="/docente/perfiles" element={<VerPerfiles />} />
          <Route path="/docente/asistencia" element={<RegistroAsistencia />}/>
          <Route path="/docente/notas" element={<RegistroNotas />} />
          <Route path="/docente/documentos" element={<DocumentosPersonales/>} />

        </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App
