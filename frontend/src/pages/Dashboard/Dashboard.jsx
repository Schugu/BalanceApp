import { useEffect, useState } from "react";
import { useBalance } from "../../context/BalanceContext.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import MovimientoCard from '../../components/movimientoCard/MovimientoCard.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
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

      <section className="min-h-scren flex flex-col items-center gap-5 p-2.5 bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">
        <article className="w-full flex flex-wrap justify-around gap-2.5 p-2.5 border-b-2 border-solid border-L-D-P-dark dark:border-D-D-P">
          <Link className="p-1.5 rounded text-center bg-green-400" to='/add-movimiento'>
            Añadir gastos
          </Link>
          <Link className="p-1.5 rounded text-center bg-red-400" to='/add-ingresos'>
            Añadir ingresos
          </Link>
        </article>
        <h1 className="font-rubik text-L-D-P-dark dark:text-D-D-P-light text-5xl font-light">$ {saldoConPuntos}</h1>

        <article className="w-full flex flex-col p-1 gap-3 bg-L-B-P dark:bg-D-B-S rounded">
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