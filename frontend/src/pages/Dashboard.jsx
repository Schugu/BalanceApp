import { useEffect, useState } from "react";
import { useBalance } from "../context/BalanceContext.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import MovimientoCard from '../components/movimientoCard/MovimientoCard.jsx';
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom"

function Dashboard() {
  const { getMovimientos, movimientos } = useBalance();
  const { user, getProfile } = useAuth();
  const [saldoConPuntos, setSaldoConPuntos] = useState(0);

  useEffect(() => {
    getMovimientos();
    getProfile();
  }, [])

  useEffect(() => {
    if (user && user.saldo) {
      setSaldoConPuntos(user.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  }, [user, user.saldo]);

  return (
    <>
      <Navbar></Navbar>
      <section className="dashboard">
        <article className="dashboardBotones">
          <Link className="botonLink agregarGastos" to='/add-movimiento'>
            Añadir gastos
          </Link>
          <Link className="botonLink agregarIngresos" to='/add-ingresos'>
            Añadir ingresos
          </Link>
        </article>
        <h1 className="valorSaldo">$ {saldoConPuntos}</h1>

        <h1>Movimientos</h1>

        {
          movimientos.length === 0 ? <h6>No hay movimientos :/</h6> :
            <article className="movimientos">
              {movimientos.map(movimiento => (
                <MovimientoCard movimiento={movimiento} key={movimiento._id} />
              ))}
            </article>
        }
      </section>
    </>
  )
}

export default Dashboard