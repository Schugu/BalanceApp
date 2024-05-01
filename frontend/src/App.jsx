import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from "./context/AuthContext.jsx";
import { BalanceProvider } from "./context/BalanceContext.jsx";

// Páginas
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MovimientosFormPage from "./pages/MovimientosFormPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {

  return (
    <AuthProvider>
      <BalanceProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard' element={<Dashboard></Dashboard>} />
              <Route path='/add-Movimiento' element={<MovimientosFormPage />} />
              <Route path='/balance/:id' element={<MovimientosFormPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BalanceProvider>
    </AuthProvider>
  )
}

export default App
