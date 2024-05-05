import { useForm } from "react-hook-form";
import { useBalance } from "../context/BalanceContext.jsx";
// El useParams sirve para que podamos obtener un objeto con los datos dinamicos que van en la URL.
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/navbar/Navbar.jsx"

function MovimientosFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { createMovimiento, getMovimiento, updateMovimiento } = useBalance();
  const { user, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const [valorMovimiento, setValorMovimiento] = useState(0);
  const [errores, setErrores] = useState([]);
  const [saldoConPuntos, setSaldoConPuntos] = useState(0);

  useEffect(() => {
    async function loadMovimiento() {
      getProfile();
      if (params.id) {
        const movimiento = await getMovimiento(params.id);
        setValue('title', movimiento.title);
        setValue('description', movimiento.description);
        setValue('balance', movimiento.balance);
        setValorMovimiento(movimiento.balance);
      }
    }
    loadMovimiento();
  }, []);

  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => {
        setErrores([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  useEffect(() => {
    if (user && user.saldo) {
      setSaldoConPuntos(user.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  }, [user, user.saldo]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      title: 'Gasto',
      balance: Math.abs(parseFloat(data.balance)),
    };

    // Modo edición
    if (params.id) {
      const saldoOriginal = user.saldo + valorMovimiento;
      if (dataValid.balance === 0 || dataValid.balance > saldoOriginal) {
        setErrores(['Saldo insuficiente']);
      } else {
        const newBalance = saldoOriginal - dataValid.balance;
        updateProfile(user.id, { saldo: newBalance });
        updateMovimiento(params.id, dataValid);
        navigate('/dashboard');
      }
    } else {
      // Modo creación
      if (dataValid.balance === 0 || dataValid.balance > user.saldo) {
        setErrores(['Saldo insuficiente']);
      } else {
        const newBalance = user.saldo - dataValid.balance;
        updateProfile(user.id, { saldo: newBalance });
        createMovimiento(dataValid);
        navigate('/dashboard');
      }
    }
  });

  return (
    <>
      <Navbar></Navbar>

      <div className="movimientosFormPage-Container">
        <h2 className="movimientosFormPage-h2">Saldo disponible: <span className="verde">$ </span><span className="agregarSaldoIngresoTitulo">{saldoConPuntos}</span></h2>
        {
          errores.map((error, i) => (
            <div key={i} className="errorMessage">
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit} className="movimientosFormPage-Form">
          <label className="movimientosFormPage-label" htmlFor="number">Ingrese un monto.</label>
          <input type="number"
            step="0.01"
            name="balance"
            {...register('balance', { required: true })}
            className="movimientosFormPage-Form-input valorSaldo"
            placeholder="$"
            autoComplete="off"
          />
          {
            errors.balance && (
              <p className="errorMessage">Balance is requiere</p>
            )
          }

          <label className="movimientosFormPage-label" htmlFor="description">Ingrese un titulo para el gasto.</label>
          <textarea
            rows="3"
            placeholder="Compra de bicicleta"
            name="description"
            {...register('description', { required: true })}
            className="movimientosFormPage-Form-input descripcionFormInput"
          ></textarea>
          {
            errors.description && (
              <p className="errorMessage">Description is requiere</p>
            )
          }
          <button className="movimientosFormPage-Form-button movimientosFormPage-Form-button-guardar">Guardar</button>
        </form>
          <button 
          onClick={()=>{navigate('/dashboard')}}
          className="movimientosFormPage-Form-button movimientosFormPage-Form-button-cancelar">Cancelar</button>
      </div>
    </>
  )
}

export default MovimientosFormPage;