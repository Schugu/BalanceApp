import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="nav">
      <Link className="link" to={isAuthenticated ? '/dashboard' : '/'}>
        <h1 className="titulo">Carpincho Eficiente</h1>
      </Link>

      <ul className="lista">
        {isAuthenticated ? (
          <>
            <li>
              ¡Bienvenido
              <Link className="user" to='/profile'>{user.username}</Link>
              !
            </li>
            <li>
              <Link className="botonLink agregar" to='/add-movimiento'>
                Añadir gastos
              </Link>
            </li>
            <li>
              <Link className="botonLink cerrar" to='/' onClick={() => { logout() }}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' className="botonLink signIn">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to='/register' className="botonLink register">
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar