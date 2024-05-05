import { useBalance } from "../../context/BalanceContext.jsx";
import { Link } from "react-router-dom";
import "./Movimientos.css";
import { useAuth } from "../../context/AuthContext.jsx";

function MovimientoCard({ movimiento }) {
  const { deleteMovimiento } = useBalance();
  const { user, getProfile, updateProfile } = useAuth();

  const borrarElemento = async () => {
    const newBalance = user.saldo + movimiento.balance;
    await updateProfile(user.id, { saldo: newBalance });
    deleteMovimiento(movimiento._id);
    getProfile();
  }

  return (
    <div className={`movimiento ${movimiento.title === 'Gasto' ? 'movGasto' : 'movIngreso'}`}>
      <header className="movimientoHeader">
        <h1 className="movimientoTitulo">{movimiento.title}</h1>
        <div className="movimientoBotones">
          {movimiento.title === 'Gasto' && (
            <button
              onClick={borrarElemento}
              className="movimientoBoton mBorrar"
            >Borrar</button>
          )}
          {movimiento.title === 'Gasto' && (
            <Link
              className="movimientoBoton mEditar"
              to={`/balance/${movimiento._id}`}
            >Editar</Link>
          )}
        </div>
      </header>
      <p className="movimientoDescripcion">{movimiento.description}</p>
      <p>{movimiento.balance}</p>
    </div>
  )
}

export default MovimientoCard;
