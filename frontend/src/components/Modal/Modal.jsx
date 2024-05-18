import format from "../../helpers/format.js";
const Modal = ({ setModalIsOpen, datosParaModal, handleConfirmation }) => {
  const { newBalance, dataValid, saldoTotal } = datosParaModal;

  const handleAceptar = () => {
    setModalIsOpen(false);
    handleConfirmation(true); // Llamada a la función de confirmación con true
  };

  const handleCancelar = () => {
    setModalIsOpen(false);
    handleConfirmation(false); // Llamada a la función de confirmación con false
  };

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
      <article className="flex flex-col gap-3 bg-L-B-S dark:bg-D-B-P text-L-T-S p-6 rounded-lg w-11/12 max-w-md">
        <h2 className="text-center text-3xl font-bold border-b-2 border-solid border-L-D-P">{dataValid.title}</h2>
        <p className="text-center text-lg ">
          ¿Estás seguro de que deseas agregar el siguiente {dataValid.title}?
        </p>
        <div className="flex flex-col gap-2 text-xl">
          <p className="border-b-2 border-dashed border-L-B-P text-L-D-P font-semibold">Descripción: <span className="text-L-T-S font-rubik">{dataValid.description}</span></p>
          <p className="border-b-2 border-dashed border-L-B-P text-L-D-P font-semibold">Balance: <span className="text-orange-600">$</span> <span className="text-L-T-S font-rubik">{dataValid.balance && format(dataValid.balance)}</span></p>
          <p className="border-b-2 border-dashed border-L-B-P text-L-D-P font-semibold">Sueldo actual: <span className="text-orange-600">$</span> <span className="text-L-T-S font-rubik">{saldoTotal && format(saldoTotal)}</span></p>
          <p className="border-b-2 border-dashed border-L-B-P text-L-D-P font-semibold">Diferencia: <span className="text-orange-600">$</span> <span className="text-L-T-S font-rubik">{newBalance && format(newBalance)}</span></p>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={handleAceptar} className="px-4 py-2 bg-green-500 text-white rounded-lg">Aceptar</button>
          <button onClick={handleCancelar} className="px-4 py-2 bg-red-500 text-white rounded-lg">Cancelar</button>
        </div>
      </article>
    </section>
  );
};

export default Modal;
