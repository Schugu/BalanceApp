
export default function format(valor) {

  return valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

