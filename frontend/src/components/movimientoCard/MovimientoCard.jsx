import { useBalance } from "../../context/BalanceContext.jsx";
import { Link } from "react-router-dom";
import "./Movimientos.css";
import { useAuth } from "../../context/AuthContext.jsx";

function MovimientoCard({ movimiento }) {
  const { deleteMovimiento } = useBalance();
  const { user, getProfile, updateProfile } = useAuth();

  const borrarElemento = async () => {
    if (movimiento.title === 'Gasto') {
      const newBalance = user.saldo + movimiento.balance;
      await updateProfile(user.id, { saldo: newBalance });
    } 
    deleteMovimiento(movimiento._id);
    getProfile();
  }

  return (
    <div className="movimiento">
      <header className="movimientoHeader">
        <h1 className="movimientoTitulo">{movimiento.title}</h1>
        <div className="movimientoBotones">
          <button
            onClick={borrarElemento}
            className="movimientoBoton mBorrar"
          >Borrar</button>

          <Link
            className="movimientoBoton mEditar"
            to={`/balance/${movimiento._id}`}
          >Editar</Link>
        </div>
      </header>
      <p className="movimientoDescripcion">{movimiento.description}</p>
      <p>{movimiento.balance}</p>
    </div>
  )
}

export default MovimientoCard;
