import { useForm } from "react-hook-form";
import { useBalance } from "../context/BalanceContext.jsx";
// El useParams sirve para que podamos obtener un objeto con los datos dinamicos que van en la URL.
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function MovimientosFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createMovimiento, getMovimiento, updateMovimiento } = useBalance();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadMovimiento() {
      if (params.id) {
        const movimiento = await getMovimiento(params.id);
        setValue('title', movimiento.title);
        setValue('description', movimiento.description);
        setValue('balance', movimiento.balance);
      }
    }
    loadMovimiento();
  }, []);


  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      balance: parseFloat(data.balance), // Convertir a número si es necesario
    };
    // Modo edición
    if (params.id) {
      updateMovimiento(params.id, dataValid);
    } else {
      // Modo creación
      createMovimiento(dataValid);
    }
    navigate('/dashboard');
  });

  return (
    <div className="movimientosFormPage-Container">
      <form onSubmit={onSubmit} className="movimientosFormPage-Form">
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          placeholder="Title"
          {...register('title')}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          rows="3"
          placeholder="Description"
          {...register('description')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>

        <label htmlFor="number">Balance</label>
        <input type="number"
          {...register('balance')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />

        <button className="bg-indigo-500 px-3 py-2 rounded-md">Guardar</button>
      </form>
    </div>
  )
}

export default MovimientosFormPage;