import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/directiva/PaginaPrincipal';
import CalculadoraSueldos from './pages/directiva/CalculadoraSueldos';
import GestionAcademica from './pages/directiva/GestionAcademica';
import Horarios from './pages/directiva/Horarios';
import VerPerfiles from './pages/directiva/VerPerfil';
import RegistroAsistencia from './pages/directiva/RegistroAsistencia';
import RegistroNotas from './pages/directiva/RegistroNotas';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Postulacion from './pages/Postulacion';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/login' element={<Login />} />
          <Route path='/postulacion' element={<Postulacion />} />
          <Route path='/directiva' element={<PaginaPrincipal/>}/>
          <Route path='/directiva/calculadora-sueldos' element={<CalculadoraSueldos />} />
          <Route path='/directiva/gestion-academica' element={<GestionAcademica />} />
          <Route path='/directiva/horarios' element={<Horarios />} />
          <Route path='/directiva/ver-perfil' element={<VerPerfiles />} />
          <Route path='/directiva/registro-asistencia' element={<RegistroAsistencia />} />
          <Route path='/directiva/registro-notas' element={<RegistroNotas/>}/>
          
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;