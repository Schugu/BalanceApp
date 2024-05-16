import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import './Navbar.css'
import { useEffect } from "react";

function Navbar() {
  const { isAuthenticated, user, getProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, [isAuthenticated])

  return (
    <nav className="navbar">
      <div className="navbar-titulo-and-profile">
        <Link className="navbar-link" to={isAuthenticated ? '/dashboard' : '/'}>
          <h1 className="navbar-titulo">Carpincho Eficiente</h1>
        </Link>

      </div>

      <div className="flex gap-2">
        <Link to='/'>Home</Link>

        {isAuthenticated ? (
          <>
            <Link to='/dashboard'>Dashboard</Link>

            <section className='navbar-logoImg'>
              <Link to='/profile'>
                <img
                  src=
                  {
                    user.profilePhoto && user.profilePhoto.urlImage
                      ? user.profilePhoto.urlImage
                      : "CarpinchoPlatudo.jpg"
                  }
                  alt="fotoDePerfil"
                />
              </Link>
            </section>
          </>
        ) : (
          <>
            <Link to='/login' className="botonLink signIn">
              Iniciar sesión
            </Link>

            <Link to='/register' className="botonLink register">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar