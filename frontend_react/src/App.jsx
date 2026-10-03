import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Páginas Públicas
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Postulacion from './pages/Postulacion';

// Vistas Directiva
import PaginaPrincipalDirectiva from './pages/directiva/PaginaPrincipal';
import CalculadoraSueldos from './pages/directiva/CalculadoraSueldos';
import GestionAcademica from './pages/directiva/GestionAcademica';
import HorariosDirectiva from './pages/directiva/Horarios';
import VerPerfilDirectiva from './pages/directiva/VerPerfil';
import RegistroAsistenciaDirectiva from './pages/directiva/RegistroAsistencia';
import RegistroNotasDirectiva from './pages/directiva/RegistroNotas';

// Vistas Docente
import PaginaPrincipalDocente from './pages/docente/PaginaPrincipal';
import MiPerfilDocente from './pages/docente/MiPerfil';
import VerPerfilesDocente from './pages/docente/VerPerfiles';
import RegistroAsistenciaDocente from './pages/docente/RegistroAsistencia';
import RegistroNotasDocente from './pages/docente/RegistroNotas';
import DocumentosPersonalesDocente from './pages/docente/DocumentosPersonales';

// Vistas Estudiante
import PaginaPrincipalEstudiante from './pages/estudiante/PaginaPrincipal';
import AsistenciaEstudiante from './pages/estudiante/Asistencia';
import HorarioEstudiante from './pages/estudiante/Horario';
import MiPerfilEstudiante from './pages/estudiante/MiPerfil';
import NotasEstudiante from './pages/estudiante/Notas';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postulacion" element={<Postulacion />} />

        
        <Route path="/directiva" element={<PaginaPrincipalDirectiva />} />
        <Route path="/directiva/calculadora-sueldos" element={<CalculadoraSueldos />} />
        <Route path="/directiva/gestion-academica" element={<GestionAcademica />} />
        <Route path="/directiva/horarios" element={<HorariosDirectiva />} />
        <Route path="/directiva/ver-perfil" element={<VerPerfilDirectiva />} />
        <Route path="/directiva/registro-asistencia" element={<RegistroAsistenciaDirectiva />} />
        <Route path="/directiva/registro-notas" element={<RegistroNotasDirectiva />} />

      
        <Route path="/docente" element={<PaginaPrincipalDocente />} />
        <Route path="/docente/perfil" element={<MiPerfilDocente />} />
        <Route path="/docente/perfiles" element={<VerPerfilesDocente />} />
        <Route path="/docente/asistencia" element={<RegistroAsistenciaDocente />} />
        <Route path="/docente/notas" element={<RegistroNotasDocente />} />
        <Route path="/docente/documentos" element={<DocumentosPersonalesDocente />} />

      
        <Route path="/estudiante" element={<PaginaPrincipalEstudiante />} />
        <Route path="/estudiante/asistencia" element={<AsistenciaEstudiante />} />
        <Route path="/estudiante/horario" element={<HorarioEstudiante />} />
        <Route path="/estudiante/perfil" element={<MiPerfilEstudiante />} />
        <Route path="/estudiante/notas" element={<NotasEstudiante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;