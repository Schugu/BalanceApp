import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useBalance } from "../../context/BalanceContext.jsx";
import { Link, useNavigate } from "react-router-dom"
import ChangeTheme from "./ChangeTheme.jsx";

function ProfilePage() {
  const [saldoConPuntos, setSaldoConPuntos] = useState(0);
  const { user, getProfile, logout, createProfilePhoto } = useAuth();
  const { getMovimientos, movimientos } = useBalance();
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [egresosTotales, setEgresosTotales] = useState(0);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const formatearCifra = (cifra) => {
    let cifraFormateada = cifra.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return cifraFormateada;
  }

  useEffect(() => {
    getMovimientos();
    getProfile();
  }, [])

  useEffect(() => {
    if (user && user.saldo) {
      setSaldoConPuntos(formatearCifra(user.saldo));
    }
  }, [user]);

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

    setIngresosTotales(formatearCifra(totalIngresos));
    setEgresosTotales(formatearCifra(totalEgresos));
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
    <section className="pageProfile">
      <article className="pageProfile-2">

        <div className="pageProfile-titlteAndImage">
          <section className="pageProfile-buttonBack-container justify-between">
            <button className="pageProfile-buttonBack" onClick={() => { navigate('/dashboard') }}>
            ⮌
            </button>

            <ChangeTheme />
          </section>

          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <section className='pageProfile-logoImg' onClick={handleProfileClick}>
            <img
              src=
              {
                user.profilePhoto && user.profilePhoto.urlImage
                  ? user.profilePhoto.urlImage
                  : "CarpinchoPlatudo.jpg"
              }
              alt="fotoDePerfil"
            />
          </section>
          <h1 className="pageProfile-tittle">{user.username}</h1>
        </div>

        <div className="pageProfile-datos">
          <h2 className="pageProfile-datos-titulo">Datos</h2>
          <h3 className="pageProfile-datos-dato">Nombre completo: <span className="blanco">Luis Petri</span></h3>
          <h3 className="pageProfile-datos-dato">Email: <span className="blanco">{user.email}</span></h3>
          <h3 className="pageProfile-datos-dato">Número: <span className="blanco">+54 3794 30 000</span></h3>
          <h3 className="pageProfile-datos-dato">Dirección: <span className="blanco">Juan Bautista Alberdi 2024</span></h3>
        </div>

        <div className="pageProfile-datos">
          <h2 className="pageProfile-datos-titulo">Balance</h2>
          <h3 className="pageProfile-datos-dato">Saldo: <span className="signoPesoProfile">$</span> <span className="blanco">{saldoConPuntos}</span></h3>
          <h3 className="pageProfile-datos-dato">Ingresos totales: <span className="signoPesoProfile">$</span> <span className="blanco">{ingresosTotales}</span></h3>
          <h3 className="pageProfile-datos-dato">Gastos totales: <span className="signoPesoProfile">$</span> <span className="blanco">{egresosTotales}</span></h3>
        </div>

        <Link className="botonLink cerrar" to='/' onClick={() => { logout() }}>
          Cerrar Sesión
        </Link>
      </article>
    </section>
  )
}

export default ProfilePage