import './Modal.css'; // Estilos CSS para la modal

const Modal = ({ setModalIsOpen, datosParaModal, handleConfirmation }) => {
  const { newBalance, dataValid, saltoTotal } = datosParaModal;

  const handleAceptar = () => {
    setModalIsOpen(false);
    handleConfirmation(true); // Llamada a la función de confirmación con true
  };

  const handleCancelar = () => {
    setModalIsOpen(false);
    handleConfirmation(false); // Llamada a la función de confirmación con false
  };


  return (
    <section className="modal">
      <article className="modal-content">
        <p>¿Estás seguro de que deseas agregar el siguiente gasto?</p>
        <p>Título: {dataValid.title}</p>
        <p>Descripción: {dataValid.description}</p>
        <p>Balance: {dataValid.balance}</p>
        <p>Sueldo actual: {saltoTotal}</p>
        <p>Diferencia: {newBalance}</p>
        <div className='botones'>
          <button onClick={handleAceptar}>Aceptar</button>
          <button onClick={handleCancelar}>Cancelar</button>
        </div>
      </article>
    </section>
  );
};

export default Modal;
