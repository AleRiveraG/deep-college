import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipal from './pages/directiva/PaginaPrincipal';
import CalculadoraSueldos from './pages/directiva/CalculadoraSueldos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/directiva/calculadora-sueldos' element={<CalculadoraSueldos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;