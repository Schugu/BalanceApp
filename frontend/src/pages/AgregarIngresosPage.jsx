import { useForm } from "react-hook-form";
import { useBalance } from "../context/BalanceContext.jsx";
// El useParams sirve para que podamos obtener un objeto con los datos dinamicos que van en la URL.
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function AgregarIngresosPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createMovimiento, getMovimiento, updateMovimiento, errors: movimientosError } = useBalance();
  const { user, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProfile();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      title: 'Ingreso',
      balance: Math.abs(parseFloat(data.balance)),
    };


    if (dataValid.balance === 0) {
      alert('Saldo insuficiente');
    } else {
      const nuevoSaldo = user.saldo + dataValid.balance;
      updateProfile(user.id, { saldo: nuevoSaldo });
      createMovimiento(dataValid);
      navigate('/dashboard');
    }
  });
  return (
    <div className="movimientosFormPage-Container">
      {
        movimientosError.map((error, i) => (
          <div key={i} className="errorMessage">
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit} className="movimientosFormPage-Form">
        <label htmlFor="description">Descripción</label>
        <textarea
          rows="3"
          placeholder="Description"
          name="description"
          {...register('description', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        {
          errors.description && (
            <p className="errorMessage">Description is requiere</p>
          )
        }

        <label htmlFor="number">Balance</label>
        <input type="number"
          name="balance"
          {...register('balance', { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {
          errors.balance && (
            <p className="errorMessage">Balance is requiere</p>
          )
        }

        <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
      </form>
    </div>
  )
}
export default AgregarIngresosPage;