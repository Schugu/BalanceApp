import axios from './axios.js'

export const getSaldoCuentaRequest = () => axios.get('/saldoCuenta');

export const getSaldoRequest = (id) => axios.get(`/saldoCuenta/${id}`);

export const createSaldoRequest = (saldo) => axios.post('/saldoCuenta', saldo);

export const updateSaldoRequest = (id, saldo) => axios.put(`/saldoCuenta/${id}`, saldo);

export const deleteSaldoRequest = (id) => axios.delete(`/saldoCuenta/${id}`); 
