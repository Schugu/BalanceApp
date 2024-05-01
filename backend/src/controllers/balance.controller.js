
// Importa el modelo de tareas
import Balance from '../models/balance.model.js'

export const createMovimiento = async (req, res) => {
  try {
    // Esperamos recibir estos tres datos del req.body;
    const { title, description, balance } = req.body;

    // Crear nuevo balance
    const newMovimiento = new Balance({
      title,
      description,
      balance,
      user: req.user.id
    })

    // Guardar nueva balance
    const savedMovimiento = await newMovimiento.save();
    res.json(savedMovimiento);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getMovimientos = async (req, res) => {
  try {
    // Buscar balance del usuario que este autenticado
    const movimiento = await Balance.find({
      user: req.user.id
    }).populate('user'); // Para traer toda la información del user.
    res.json(movimiento);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' });
  }
};

export const getMovimiento = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id
    const movimiento = await Balance.findById(req.params.id).populate('user');

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!movimiento) return res.status(404).json({ message: 'Movimiento not found.' });

    // Si se encontro la tarea, devolverla.
    res.json(movimiento);
  } catch (error) {
    return res.status(404).json({ message: 'Movimiento not found' });
  }
};

export const updateMovimiento = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id y actualizarla.
    const movimiento = await Balance.findByIdAndUpdate(req.params.id, req.body, {
      new: true // Esto significa que nos debe dar el dato actualizado y no el anterior. 
    });

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!movimiento) return res.status(404).json({ message: 'Movimiento not found.' });

    // Si se encontro y se actualizó la tarea, devolverla.
    res.json(movimiento);
  } catch (error) {
    return res.status(404).json({ message: 'Movimiento not found' });
  }
}

export const deleteMovimiento = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id y eliminarla.
    const movimiento = await Balance.findByIdAndDelete(req.params.id);

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!movimiento) return res.status(404).json({ message: 'Movimiento not found.' });

    // Si se encontro y se eliminó la tarea, devolverla un codigo correcto.
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'Movimiento not found' });
  }
};