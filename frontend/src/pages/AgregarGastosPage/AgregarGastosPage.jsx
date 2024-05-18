import { useForm } from "react-hook-form";
import { useBalance } from "../../context/BalanceContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import format from "../../helpers/format.js";

function MovimientosFormPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createMovimiento } = useBalance();
  const { user, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [errores, setErrores] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [datosParaModal, setdatosParaModal] = useState([]);

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
      title: 'Gasto',
      balance: Math.abs(parseFloat(data.balance)),
    };

    if (dataValid.balance === 0 || dataValid.balance > user.saldo) {
      setErrores(['Saldo insuficiente']);
    } else {
      const newBalance = user.saldo - dataValid.balance;
      const saltoTotal = user.saldo;
      setdatosParaModal({ newBalance, dataValid, saltoTotal });
      setModalIsOpen(true);
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
  };

  return (
    <>
      <Navbar></Navbar>

      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} datosParaModal={datosParaModal} handleConfirmation={handleConfirmation} />}

      <div className="w-full min-h-screen flex flex-col items-center gap-2.5 p-2.5">
        {
          errores.map((error, i) => (
            <div key={i} className="bg-red-100 text-red-600 w-9/12 text-center p-2">
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-2.5">
          <section className="w-full flex flex-col items-center gap-0.5">
            <label className="text-2xl text-center" htmlFor="number">Ingrese un monto.</label>
            <input type="number"
              step="0.01"
              name="balance"
              {...register('balance', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P outline-L-D-P text-white text-3xl"
              placeholder="$"
              autoComplete="off"
            />
            {
              errors.balance && (
                <p className="bg-red-100 text-red-600 w-9/12 text-center p-2">Balance is requiere</p>
              )
            }
            <h2 className="text-lg text-center">Saldo disponible: <span className="text-L-D-P-dark">$ </span><span className="font-rubik">{user && user.saldo && format(user.saldo)}</span></h2>
          </section>


          <section className="w-full flex flex-col items-center gap-0.5">
            <label className="text-xl text-center" htmlFor="description">Ingrese un titulo para el gasto.</label>
            <textarea
              rows="3"
              placeholder="Compra de bicicleta"
              name="description"
              {...register('description', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P outline-L-D-P text-white resize-none text-2xl"
            ></textarea>
            {
              errors.description && (
                <p className="bg-red-100 text-red-600 w-9/12 text-center p-2">Description is requiere</p>
              )
            }
          </section>

          <button className="w-full p-2 bg-L-D-P">Guardar</button>
        </form>
        <button
          onClick={() => { navigate('/dashboard') }}
          className="w-full p-2 bg-red-500">Cancelar</button>
      </div>
    </>
  )
}

export default MovimientosFormPage;