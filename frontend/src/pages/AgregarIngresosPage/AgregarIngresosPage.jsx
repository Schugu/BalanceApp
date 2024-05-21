import { useForm } from "react-hook-form";
import { useBalance } from "../../context/BalanceContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import format from "../../helpers/format.js";

function AgregarIngresosPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createMovimiento } = useBalance();
  const { user, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [errores, setErrores] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosParaModal, setdatosParaModal] = useState([]);
  const containerRef = useRef(null);
  const [savedTabIndexes, setSavedTabIndexes] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => {
        setErrores([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      title: 'Ingreso',
      balance: Math.abs(parseFloat(data.balance)),
    };

    if (dataValid.balance === 0) {
      setErrores(['Introdusca un saldo mayor a 0']);
    } else {
      const newBalance = user.saldo + dataValid.balance;
      const saldoTotal = user.saldo;
      setdatosParaModal({ newBalance, dataValid, saldoTotal });
      setModalIsOpen(true);
      disableTabIndexOutsideModal();
    }
  });

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      if (!params.id) {
        updateProfile(user.id, { saldo: datosParaModal.newBalance });
        createMovimiento(datosParaModal.dataValid);
        navigate('/dashboard');
      }
    }
    setModalIsOpen(false);
    restoreTabIndexOutsideModal();
  };

  const disableTabIndexOutsideModal = () => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('[tabindex]');
      const tabIndexes = [];
      elements.forEach(element => {
        tabIndexes.push({ element, tabIndex: element.getAttribute('tabindex') });
        element.setAttribute('tabindex', '-1');
      });
      setSavedTabIndexes(tabIndexes);
    }
  };

  const restoreTabIndexOutsideModal = () => {
    savedTabIndexes.forEach(({ element, tabIndex }) => {
      if (tabIndex) {
        element.setAttribute('tabindex', tabIndex);
      } else {
        element.removeAttribute('tabindex');
      }
    });
    setSavedTabIndexes([]);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P" ref={containerRef}>
      <Navbar></Navbar>

      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} datosParaModal={datosParaModal} handleConfirmation={handleConfirmation} />}

      <section className="lg:w-3/6 w-full min-h-screen flex flex-col items-center gap-2.5 p-2.5 bg-L-B-P dark:bg-D-B-P dark:text-D-T-P">
        {
          errores.map((error, i) => (
            <article tabIndex={4} key={i} className="bg-red-100 text-red-600 w-full text-center p-1 rounded">
              {error}
            </article>
          ))
        }
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center gap-6">
          <article className="w-full flex flex-col items-center gap-1.5">
            <label className="text-2xl text-center" htmlFor="number">Ingrese un monto.</label>
            <input
              tabIndex={5}
              type="number"
              step="0.01"
              name="balance"
              {...register('balance', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P focus:outline-none focus:ring-2 focus:ring-L-D-P text-white text-3xl"
              placeholder="$"
              autoComplete="off"
            />
            {
              errors.balance && (
                <p tabIndex={6} className="bg-red-100 text-red-600 w-full text-center p-1 rounded">El valor es requerido.</p>
              )
            }
            <h2 tabIndex={7} className="text-lg text-center">Saldo disponible: <span className="text-L-D-P-dark">$ </span><span className="font-rubik">{user && user.saldo && format(user.saldo)}</span></h2>
          </article>

          <article className="w-full flex flex-col items-center gap-1.5 pt-2 border-t-2 border-solid border-L-D-P">
            <label className="text-xl text-center" htmlFor="description">Ingrese un titulo para el Ingreso.</label>
            <textarea
              tabIndex={8}
              rows="3"
              placeholder="Cobro de sueldo"
              name="description"
              {...register('description', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P focus:outline-none focus:ring-2 focus:ring-L-D-P text-white resize-none text-2xl"
            ></textarea>
            {
              errors.description && (
                <p tabIndex={9} className="bg-red-100 text-red-600 w-full text-center p-1 rounded">La descripción es requerida.</p>
              )
            }
          </article>

          <button tabIndex={10} className="w-full p-2 bg-L-D-P rounded-lg hover:bg-opacity-75">Guardar</button>
        </form>
        <button
          tabIndex={11}
          onClick={() => { navigate('/dashboard') }}
          className="w-full p-2 bg-red-500 rounded-lg hover:bg-opacity-70">Cancelar</button>
      </section>
    </div>
  )
}

export default AgregarIngresosPage;
