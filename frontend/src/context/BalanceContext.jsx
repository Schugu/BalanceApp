import { createContext, useContext, useState } from "react"

import {
  createMovimientoRequest,
  getMovimientosRequest,
  getMovimientoRequest,
  updateMovimientoRequest,
  deleteMovimientoRequest
} from "../api/balance.js";

const BalanceContext = createContext();

export const useBalance = () => {
  const context = useContext(BalanceContext);

  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }

  return context;
}

export function BalanceProvider({ children }) {
  const [movimientos, setMovimientos] = useState([]);

  const [errors, setErrors] = useState([]);

  const createMovimiento = async (movimiento) => {
    try {
      await createMovimientoRequest(movimiento);
    } catch (error) {
      // Si es un array devolverlo solamente
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Sino devolverlo como un array
      setErrors([error.response.data.message]);
    }
  };

  const getMovimientos = async () => {
    try {
      const res = await getMovimientosRequest();
      setMovimientos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMovimiento = async (id) => {
    try {
      const res = await getMovimientoRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovimiento = async (id, movimiento) => {
    try {
      await updateMovimientoRequest(id, movimiento);
    } catch (error) {
      // Si es un array devolverlo solamente
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      // Sino devolverlo como un array
      setErrors([error.response.data.message]);
    }
  };

  const deleteMovimiento = async (id) => {
    try {
      const res = await deleteMovimientoRequest(id);
      if (res.status === 204) {
        // Crea un arreglo nuevo sin la tarea que acabamos de eliminar
        setMovimientos(movimientos.filter(task => task._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BalanceContext.Provider value={{
      movimientos,
      createMovimiento,
      getMovimientos,
      getMovimiento,
      updateMovimiento,
      deleteMovimiento,
      errors
    }}>
      {children}
    </BalanceContext.Provider>
  )
}