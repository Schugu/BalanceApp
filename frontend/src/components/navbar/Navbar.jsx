import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-titulo-and-profile">
        <Link className="navbar-link" to={isAuthenticated ? '/dashboard' : '/'}>
          <h1 className="navbar-titulo">Carpincho Eficiente</h1>
        </Link>

      </div>

      <ul className="navbar-lista">
        {isAuthenticated ? (
          <>
            <div className="navbar-titulo-and-profile">
              <h2 className="navbar-titulo-and-profile-welcomeUser">
                ¡Bienvenido <span className="naranja">{user.username}</span>! 
              </h2>

              <section className='navbar-logoImg'>
                <Link to='/profile'><img src="CarpinchoPlatudo.jpg" alt="fotoDePerfil" /></Link>
              </section>
            </div>
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