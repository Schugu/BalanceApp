import axios from './axios.js'

export const createMovimientoRequest = (movimiento) => axios.post('/balance', movimiento);

export const getMovimientosRequest = () => axios.get('/balance');

export const getMovimientoRequest = (id) => axios.get(`/balance/${id}`);

export const updateMovimientoRequest = (id, movimiento) => axios.put(`/balance/${id}`, movimiento);

export const deleteMovimientoRequest = (id) => axios.delete(`/balance/${id}`); 
