import { useForm } from "react-hook-form";
import { useBalance } from "../../context/BalanceContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    <div className="w-full min-h-screen flex flex-col items-center bg-L-B-P text-L-T-P dark:bg-D-B-P dark:text-D-T-P">
      <Navbar></Navbar>

      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} datosParaModal={datosParaModal} handleConfirmation={handleConfirmation} />}

      <section className="lg:w-3/6 w-full min-h-screen flex flex-col items-center gap-2.5 p-2.5 bg-L-B-P dark:bg-D-B-P dark:text-D-T-P">
        {
          errores.map((error, i) => (
            <article key={i} className="bg-red-100 text-red-600 w-full text-center p-1 rounded">
              {error}
            </article>
          ))
        }
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center gap-6">
          <article className="w-full flex flex-col items-center gap-1.5">
            <label className="text-2xl text-center" htmlFor="number">Ingrese un monto.</label>
            <input type="number"
              step="0.01"
              name="balance"
              {...register('balance', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P focus:outline-none focus:ring-2 focus:ring-L-D-P text-white text-3xl"
              placeholder="$"
              autoComplete="off"
            />
            {
              errors.balance && (
                <p className="bg-red-100 text-red-600 w-full text-center p-1 rounded">Balance is requiere</p>
              )
            }
            <h2 className="text-lg text-center">Saldo disponible: <span className="text-L-D-P-dark">$ </span><span className="font-rubik">{user && user.saldo && format(user.saldo)}</span></h2>
          </article>

          <article className="w-full flex flex-col items-center gap-1.5 pt-2 border-t-2 border-solid border-L-D-P">
            <label className="text-xl text-center" htmlFor="description">Ingrese un titulo para el Ingreso.</label>
            <textarea
              rows="3"
              placeholder="Cobro de sueldo"
              name="description"
              {...register('description', { required: true })}
              className="w-full p-4 bg-L-B-S rounded-lg placeholder:text-L-D-P focus:outline-none focus:ring-2 focus:ring-L-D-P text-white resize-none text-2xl"
            ></textarea>
            {
              errors.description && (
                <p className="bg-red-100 text-red-600 w-full text-center p-1 rounded">Description is requiere</p>
              )
            }
          </article>

          <button className="w-full p-2 bg-L-D-P rounded-lg hover:bg-opacity-75">Guardar</button>
        </form>
        <button
          onClick={() => { navigate('/dashboard') }}
          className="w-full p-2 bg-red-500 rounded-lg hover:bg-opacity-70">Cancelar</button>
      </section>
    </div>
  )
}
export default AgregarIngresosPage;