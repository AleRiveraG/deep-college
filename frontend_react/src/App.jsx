import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;