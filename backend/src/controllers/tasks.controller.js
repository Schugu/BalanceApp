
// Importa el modelo de tareas
import Task from '../models/task.model.js'


export const getTasks = async (req, res) => {
  try {
    // Buscar tareas del usuario que este autenticado
    const tasks = await Task.find({
      user: req.user.id
    }).populate('user'); // Para traer toda la información del user.
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export const createTasks = async (req, res) => {
  try {
    // Esperamos recibir estos tres datos del req.body;
    const { title, description, date } = req.body;

    // Crear nueva tarea
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id
    })

    // Guardar nueva tarea
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getTask = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id
    const task = await Task.findById(req.params.id).populate('user');

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Si se encontro la tarea, devolverla.
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
}

export const deleteTasks = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id y eliminarla.
    const task = await Task.findByIdAndDelete(req.params.id);

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Si se encontro y se eliminó la tarea, devolverla.
    res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
}

export const updateTasks = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar una tarea por el id y actualizarla.
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true // Esto significa que nos debe dar el dato actualizado y no el anterior. 
    });

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    // Si se encontro y se actualizó la tarea, devolverla.
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: 'Task not found' });
  }
}