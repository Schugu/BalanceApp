import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function Navbar() {
  const { isAuthenticated, user, getProfile } = useAuth();

  useEffect(() => {
    getProfile();
  }, [isAuthenticated])

  return (
    <section className="w-full flex flex-col gap-5 p-2 bg-L-B-S text-L-T-S dark:bg-D-B-P-dark dark:text-D-T-P border-b-2 border-solid border-L-D-P">
      <div className="flex flex-wrap gap-2 justify-around items-center text-3xl">
        <Link to='/' className="hover:text-L-D-P dark:hover:text-L-D-P-light">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to='/dashboard' className="hover:text-L-D-P dark:hover:text-L-D-P-light">Dashboard</Link>

            <section className='w-11 h-11 rounded-full overflow-hidden border-2 border-solid border-L-D-P'>
              <Link to='/profile'>
                <img
                  className="w-full h-auto object-cover object-center"
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
            <Link to='/login' className="rounded-full text-center py-0.5 px-3 bg-L-D-P-dark text-base hover:bg-opacity-75">
              Ingresar
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default Navbar