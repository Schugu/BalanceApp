import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx"

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  // Si loading es true realizar algo 
  if (loading) return <h1>Loading...</h1>
  // Si el usuario no esta autentificado redireccionarlo a login y sobreecribir la ruta.
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

  // Si el usuario esta autentificado continuar con el componente que esta dentro de la ruta (las páginas).
  return <Outlet/>
}

export default ProtectedRoute;