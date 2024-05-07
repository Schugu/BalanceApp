import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext.jsx";
import { Link, useNavigate } from "react-router-dom"

function ProfilePage() {
  const [saldoConPuntos, setSaldoConPuntos] = useState(0);
  const { user, getProfile, logout } = useAuth();
  const { getMovimientos, movimientos } = useBalance();
  const [ingresosTotales, setIngresosTotales] = useState(0);
  const [egresosTotales, setEgresosTotales] = useState(0);
  const navigate = useNavigate();

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


  return (
    <section className="pageProfile">
      <article className="pageProfile-2">

        <div className="pageProfile-titlteAndImage">
          <section className="pageProfile-buttonBack-container">
            <button className="pageProfile-buttonBack" onClick={()=>{navigate('/dashboard')}}>
              <img src="./icons/backArrow.svg" alt="" /></button></section>

          <section className='pageProfile-logoImg'>
            <img src="CarpinchoPlatudo.jpg" alt="fotoDePerfil" />
          </section>
          <h1 className="pageProfile-tittle">{user.username}</h1>
        </div>

        <div className="pageProfile-datos">
          <h2 className="pageProfile-datos-titulo">Datos</h2>
          <h3 className="pageProfile-datos-dato">Email: {user.email}</h3>
        </div>

        <div>
          <h2>Saldo: {saldoConPuntos}</h2>
          <h2>Ingresos totales: {ingresosTotales}</h2>
          <h2>Gastos totales: {egresosTotales}</h2>
        </div>

        <Link className="botonLink cerrar" to='/' onClick={() => { logout() }}>
          Cerrar Sesión
        </Link>
      </article>
    </section>
  )
}

export default ProfilePage