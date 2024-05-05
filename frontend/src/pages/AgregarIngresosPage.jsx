import { useForm } from "react-hook-form";
import { useBalance } from "../context/BalanceContext.jsx";
// El useParams sirve para que podamos obtener un objeto con los datos dinamicos que van en la URL.
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/navbar/Navbar.jsx"

function AgregarIngresosPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createMovimiento } = useBalance();
  const { user, updateProfile, getProfile } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);
  const [saldoConPuntos, setSaldoConPuntos] = useState(0);

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

  useEffect(() => {
    if (user && user.saldo) {
      setSaldoConPuntos(user.saldo.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  }, [user, user.saldo]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      title: 'Ingreso',
      balance: Math.abs(parseFloat(data.balance)),
    };

    if (dataValid.balance === 0) {
      setErrores(['Introdusca un saldo mayor a 0']);
    } else {
      const nuevoSaldo = user.saldo + dataValid.balance;
      updateProfile(user.id, { saldo: nuevoSaldo });
      createMovimiento(dataValid);
      navigate('/dashboard');
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

          <label className="movimientosFormPage-label" htmlFor="description">Ingrese un titulo para el ingreso.</label>
          <textarea
            rows="3"
            placeholder="Cobro de sueldo"
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
          onClick={() => { navigate('/dashboard') }}
          className="movimientosFormPage-Form-button movimientosFormPage-Form-button-cancelar">Cancelar</button>
      </div>
    </>
  )
}
export default AgregarIngresosPage;