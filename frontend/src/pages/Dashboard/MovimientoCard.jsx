import { useState } from "react";
import format from "../../helpers/format.js";
import formatDate from "../../helpers/formatDate.js";


function MovimientoCard({ movimiento, index, cantmovimientos }) {
  const [estadoAcordeon, setEstadoAcordeon] = useState('cerrado');
  
  const handleClick = () => {
    if (estadoAcordeon === 'cerrado') {
      setEstadoAcordeon('abierto');
    } else if (estadoAcordeon === 'abierto') {
      setEstadoAcordeon('cerrado');
    }
  }

  return (
    <section className="flex flex-col items-center w-full" 
    tabIndex={100  + cantmovimientos - index}
    aria-label={`
    Tipo de movimiento: ${movimiento.title},
    Descripción: ${movimiento.description},
    Valor: ${format(movimiento.balance)},
    Fecha: ${formatDate(movimiento.createdAt).date}, 
    Hora: ${formatDate(movimiento.createdAt).time}`}
    >
      <div onClick={handleClick}
        className={`w-full flex flex-wrap justify-between p-2 dark:bg-D-B-S-light text-xl border-2 border-solid border-D-B-S cursor-pointer hover:bg-L-B-P-dark hover:dark:border-white dark:border-transparent
        ${estadoAcordeon === 'cerrado' ? 'rounded' : 'rounded-t'}`}>

        <p aria-hidden="true" className="">{movimiento.description}</p>
        <p aria-hidden="true" className={`${movimiento.title === 'Gasto' ? 'text-red-500 dark:text-red-400' : 'text-L-D-P-dark dark:text-D-D-P'}`}>
          ${format(movimiento.balance)} {' '}
          {movimiento.title === 'Gasto' ? '🡣' : '🡩'}
        </p>
      </div>

      <div className={`${estadoAcordeon === 'cerrado' ? 'hidden' : ''} w-full flex justify-around flex-wrap p-2 border-2 border-solid border-black dark:border-D-B-S-light rounded-b`}>
        <p aria-hidden="true" className="text-yellow-600 dark:text-yellow-300 text-xl">Fecha: <span className="text-lg text-L-T-P dark:text-D-T-P">{formatDate(movimiento.createdAt).date}</span></p>
        <p aria-hidden="true" className="text-yellow-600 dark:text-yellow-300 text-xl">Hora: <span className="text-lg text-L-T-P dark:text-D-T-P">{formatDate(movimiento.createdAt).time}</span></p>
      </div>
    </section>
  )
}

export default MovimientoCard;
