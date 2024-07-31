import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import BuscadorCliente from './paginas/BuscadorCliente'
import Registrar from './paginas/Registrar'

function App() {

  return (
      <BrowserRouter>
          <Routes>
                <Route path="/" element={<AuthLayout />}>
                      <Route index element={<BuscadorCliente />} />
                      <Route path='registrar-cliente' element={<Registrar />} />
                </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
