import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/directiva/PaginaPrincipal';
import CalculadoraSueldos from './pages/directiva/CalculadoraSueldos';
import GestionAcademica from './pages/directiva/GestionAcademica';
import Horarios from './pages/directiva/Horarios';
import VerPerfiles from './pages/directiva/VerPerfil';
import RegistroAsistencia from './pages/directiva/RegistroAsistencia';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/directiva' element={<PaginaPrincipal/>}/>
          <Route path='/directiva/calculadora-sueldos' element={<CalculadoraSueldos />} />
          <Route path='/directiva' element={<PaginaPrincipal/>}/>
          <Route path='/directiva/gestion-academica' element={<GestionAcademica />} />
          <Route path='/directiva/horarios' element={<Horarios />} />
          <Route path='/directiva/ver-perfil' element={<VerPerfiles />} />
          <Route path='/directiva/registro-asistencia' element={<RegistroAsistencia />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;