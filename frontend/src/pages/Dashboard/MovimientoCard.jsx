import format from "../../helpers/format.js";


function MovimientoCard({ movimiento }) {
  return (
    <div className='flex flex-wrap justify-between p-2 rounded dark:bg-D-B-S-light text-xl'>
      <p className="">{movimiento.description}</p>
      <p className={`${movimiento.title === 'Gasto' ? 'text-red-500' : 'text-L-D-P'}`}>
        ${format(movimiento.balance)} {' '}
        {movimiento.title === 'Gasto' ? '🡣' : '🡩'}
        </p>
    </div>
  )
}

export default MovimientoCard;
