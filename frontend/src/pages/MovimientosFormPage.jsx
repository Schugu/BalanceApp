import { useForm } from "react-hook-form";
import { useBalance } from "../context/BalanceContext.jsx";
// El useParams sirve para que podamos obtener un objeto con los datos dinamicos que van en la URL.
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

function MovimientosFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createMovimiento, getMovimiento, updateMovimiento, errors: movimientosError } = useBalance();
  const { user, setUser, updateProfile } = useAuth();
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
      const newBalance = user.saldo + dataValid.balance;
      const updatedUser = { ...user, saldo: newBalance };
      setUser(updatedUser);
      updateProfile(user.id, { saldo: newBalance });
    } else {
      // Modo creación
      createMovimiento(dataValid);
      const newBalance = user.saldo + dataValid.balance;
      const updatedUser = { ...user, saldo: newBalance };
      setUser(updatedUser);
      updateProfile(user.id, { saldo: newBalance });
    }
    
    console.log(user);
    navigate('/dashboard');
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
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          {...register('title', { required: true })}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        {
          errors.title && (
            <p className="errorMessage">Titulo is requiere</p>
          )
        }

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

export default MovimientosFormPage;