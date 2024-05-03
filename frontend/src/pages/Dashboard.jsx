import { useEffect } from "react";
import { useBalance } from "../context/BalanceContext.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import MovimientoCard from '../components/movimientoCard/MovimientoCard.jsx';
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { getMovimientos, movimientos } = useBalance();
  const { user, getProfile } = useAuth();
  useEffect(() => {
    getMovimientos();
    getProfile();
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <section className="dashboard">
        <h1>Saldo: {user.saldo}</h1>

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