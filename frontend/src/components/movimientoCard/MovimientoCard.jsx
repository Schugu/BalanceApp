import "./Movimientos.css";

function MovimientoCard({ movimiento }) {
  return (
    <div className={`movimiento ${movimiento.title === 'Gasto' ? 'movGasto' : 'movIngreso'}`}>
      <header className="movimientoHeader">
        <h1 className="movimientoTitulo">{movimiento.title}</h1>
      </header>
      <p className="movimientoDescripcion">{movimiento.description}</p>
      <p>{movimiento.balance}</p>
    </div>
  )
}

export default MovimientoCard;
