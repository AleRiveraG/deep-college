import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/directiva/PaginaPrincipal';
import CalculadoraSueldos from './pages/directiva/CalculadoraSueldos';
import GestionAcademica from './pages/directiva/GestionAcademica';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/directiva/calculadora-sueldos' element={<CalculadoraSueldos />} />
          <Route path='/directiva/gestion-academica' element={<GestionAcademica />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;