import { useEffect } from "react";
import { useBalance } from "../context/BalanceContext.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import MovimientoCard from '../components/movimientoCard/MovimientoCard.jsx';


function Dashboard() {
  const { getMovimientos, movimientos } = useBalance();

  useEffect(() => {
    getMovimientos();
  }, [])

  if (movimientos.length === 0) return (<h1>No tasks</h1>);

  return (
    <>
      <Navbar></Navbar>

      <section className="dashboard">
        <h1>Movimientos</h1>

        <article className="movimientos">
            {movimientos.map(movimiento => (
              <MovimientoCard movimiento={movimiento} key={movimiento._id} />
            ))}
        </article>

      </section>



    </>
  )
}

export default Dashboard