import { useEffect } from "react";
import { useBalance } from "../../context/BalanceContext.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import MovimientoCard from './MovimientoCard.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom"
import format from "../../helpers/format.js";

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

      <section className="min-h-scren flex flex-col items-center gap-5 p-2.5 bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">
        <article className="w-full flex flex-wrap justify-around gap-2.5 px-2.5 pb-2.5 border-b-2 border-solid border-L-D-P-dark dark:border-D-D-P">
          <Link to='/add-movimiento'>
            <p className="text-white rounded-full text-center py-0.5 px-3 bg-red-900 text-base hover:bg-opacity-75">Añadir ingreso</p>
          </Link>
          <Link to='/add-ingresos'>
            <p className="text-white rounded-full text-center py-0.5 px-3 bg-L-D-P-dark text-base hover:bg-opacity-75">Añadir ingreso</p>
          </Link>
        </article>

        <article className="flex flex-col gap-1 items-center">
          <p className="text-L-T-P-light dark:text-D-T-P-dark">Saldo de la cuenta:</p>
          <h1 className="font-rubik text-L-D-P-dark dark:text-D-D-P-light text-5xl font-light">$ {user && user.saldo && format(user.saldo)}</h1>
        </article>

        <article className="w-full flex flex-col p-1 gap-3 bg-L-B-P dark:bg-D-B-S rounded border-2 border-solid border-L-D-P-dark dark:border-none">
          {movimientos.length === 0 ? <h6 className="text-center">No hay movimientos :/</h6> : <h1 className="text-center">Movimientos</h1>}


          <div className="flex flex-col-reverse gap-3">
            {movimientos.map(movimiento => (
              <MovimientoCard movimiento={movimiento} key={movimiento._id} />
            ))}
          </div>
        </article>

      </section>
    </>
  )
}

export default Dashboard