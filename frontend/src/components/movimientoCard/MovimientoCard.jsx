import { useBalance } from "../../context/BalanceContext.jsx";
import { Link } from "react-router-dom";
import "./Movimientos.css";

function MovimientoCard({ movimiento }) {
  const { deleteMovimiento } = useBalance();

  return (
    <div className="movimiento">
      <header className="movimientoHeader">
        <h1 className="movimientoTitulo">{movimiento.title}</h1>
        <div className="movimientoBotones">
          <button
            onClick={() => { deleteMovimiento(movimiento._id) }}
            className="movimientoBoton mBorrar"
          >Borrar</button>

          <Link
            to={`/balance/${movimiento._id}`}
            className="movimientoBoton mEditar"
          >Editar</Link>
        </div>
      </header>
      <p className="movimientoDescripcion">{movimiento.description}</p>
      <p>{movimiento.balance}</p>
    </div>
  )
}

export default MovimientoCard;