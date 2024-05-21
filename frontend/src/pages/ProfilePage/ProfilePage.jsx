import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useBalance } from "../../context/BalanceContext.jsx";
import { Link, useNavigate } from "react-router-dom"
import ChangeTheme from "./ChangeTheme.jsx";
import format from "../../helpers/format.js";

function ProfilePage() {
  const { user, getProfile, logout, createProfilePhoto } = useAuth();
  const { getMovimientos, movimientos } = useBalance();
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [egresosTotales, setEgresosTotales] = useState(0);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    getMovimientos();
    getProfile();
  }, [])

  useEffect(() => {
    const totalIngresos = movimientos.reduce((total, movimiento) => {
      if (movimiento.title === 'Ingreso') {
        return total + movimiento.balance;
      }
      return total;
    }, 0);

    const totalEgresos = movimientos.reduce((total, movimiento) => {
      if (movimiento.title === 'Gasto') {
        return total + movimiento.balance;
      }
      return total;
    }, 0);

    setIngresosTotales(format(totalIngresos));
    setEgresosTotales(format(totalEgresos));
  }, [movimientos]);

  const handleFileChange = (event) => {
    handleFileUpload(event.target.files[0]);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      await createProfilePhoto(user.id, formData);
      getProfile();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center p-2 bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-D-P-light">
      <article className="flex flex-col justify-center items-center gap-5 w-full rounded-md p-2.5 dark:bg-D-B-P-light">

        <div className="w-full flex flex-col items-center">
          <section className="w-full flex justify-between">
            <button className="text-3xl border-2 border-solid border-transparent hover:border-L-D-P rounded-full px-2.5 py-1 hover:bg-L-D-P hover:bg-opacity-15" onClick={() => { navigate('/dashboard') }}>
              ⮌
            </button>

            <ChangeTheme />
          </section>

          <section className="flex flex-col gap-3">
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <article className='w-40 h-40 rounded-full overflow-hidden border-4 border-solid border-L-D-P cursor-pointer'
              onClick={handleProfileClick}
            >
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
            </article>
            <p className="text-3xl text-center border-b-2 border-solid border-L-D-P">{user.username}</p>
          </section>
        </div>

        <div className="w-full">
          <h2 className="text-left text-xl">Datos</h2>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Nombre completo: <span className="text-L-D-P-dark dark:text-white">Luis Petri</span></h3>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Email: <span className="text-L-D-P-dark dark:text-white">{user.email}</span></h3>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Número: <span className="text-L-D-P-dark dark:text-white">+54 3794 30 000</span></h3>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Dirección: <span className="text-L-D-P-dark dark:text-white">Juan Bautista Alberdi 2024</span></h3>
        </div>

        <div className="w-full">
          <h2 className="text-left text-xl">Balance</h2>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Saldo: <span className="text-orange-600">$</span> <span className="text-L-D-P-dark dark:text-white">{user && user.saldo && format(user.saldo)}</span></h3>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Ingresos totales: <span className="text-orange-600">$</span> <span className="text-L-D-P-dark dark:text-white">{ingresosTotales}</span></h3>
          <h3 className="text-left p-1.5 border-t border-dashed border-black dark:border-white">Gastos totales: <span className="text-orange-600">$</span> <span className="text-L-D-P-dark dark:text-white">{egresosTotales}</span></h3>
        </div>

        <Link className="py-0.5 px-3 rounded text-center bg-red-500 text-L-T-S" to='/' onClick={() => { logout() }}>
          Cerrar Sesión
        </Link>
      </article>
    </section>
  )
}

export default ProfilePage