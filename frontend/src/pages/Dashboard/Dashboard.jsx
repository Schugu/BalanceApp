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
    <div className="w-full min-h-screen flex flex-col items-center bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">

      <Navbar></Navbar>

      <section className="lg:w-4/6 w-full min-h-screen flex flex-col items-center gap-5 p-2.5">
        <article className="w-full flex flex-wrap justify-around gap-2.5 px-2.5 pb-2.5 border-b-2 border-solid border-L-D-P-dark dark:border-D-D-P">
          <Link tabIndex={4} to='/add-movimiento' className="text-white rounded-full text-center py-0.5 px-3 bg-red-900 text-base hover:bg-opacity-75">
            Añadir gasto
          </Link>
          <Link tabIndex={5} to='/add-ingresos' className="text-white rounded-full text-center py-0.5 px-3 bg-L-D-P-dark text-base hover:bg-opacity-75">
            Añadir ingreso
          </Link>
        </article>

        <article className="flex flex-col gap-1 items-center">
          <p tabIndex={6} className="text-L-T-P-light dark:text-D-T-P-dark">Saldo de la cuenta:</p>
          <p tabIndex={7} className="font-rubik text-L-D-P-dark dark:text-D-D-P-light text-5xl font-light">$ {user && user.saldo && format(user.saldo)}</p>
        </article>

        <article className="w-full flex flex-col p-1 gap-3 bg-L-B-P dark:bg-D-B-S rounded border-2 border-solid border-L-D-P-dark dark:border-none">
          {movimientos.length === 0 ? <p tabIndex={8} className="text-center text-xl">No hay movimientos :/</p> : <p tabIndex={8} className="text-center text-xl">Movimientos</p>}


          <div className="flex flex-col-reverse gap-3">
            {movimientos.map((movimiento, index) => (
              <MovimientoCard movimiento={movimiento} key={movimiento._id} index={index} cantmovimientos={movimientos.length} />
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

export default Dashboard