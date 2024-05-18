import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext.jsx";
import { BalanceProvider } from "./context/BalanceContext.jsx";

import { ThemeProvider } from "./context/ThemeContext.jsx";

// Páginas
import HomePage from "./pages/HomePage/HomePage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import AgregarGastosPage from "./pages/AgregarGastosPage/AgregarGastosPage.jsx";
import AgregarIngresosPage from "./pages/AgregarIngresosPage/AgregarIngresosPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {

  return (
    <AuthProvider>
      <BalanceProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add-movimiento' element={<AgregarGastosPage />} />
                {/* <Route path='/balance/:id' element={<AgregarGastosPage />} /> */}
                <Route path='/add-ingresos' element={<AgregarIngresosPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </BalanceProvider>
    </AuthProvider>
  )
}

export default App
