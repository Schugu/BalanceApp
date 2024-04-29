// Importar el enrutador de express y ejecutarlo
import { Router } from "express";
const router = Router();

// Importar la función authRequire de validateToken.js
import { authRequire } from '../middlewares/validateToken.js'

// Importar funciones del tasks.controller.js
import {
  getTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks
} from '../controllers/tasks.controller.js'

// Importar el validator.middleware
import {validateSchema} from '../middlewares/validator.middleware.js'

// Importar el schema de tasks
import { createTaskSchema } from '../schemas/task.schema.js'

// RUTAS
// Obtener
router.get('/tasks', authRequire, getTasks);

// Obtener uno solo
router.get('/tasks/:id', authRequire, getTask);

// Crear
router.post(
  '/tasks', 
  authRequire, // se valida si el usuario esta autenticado
  validateSchema(createTaskSchema), // se validan los datos
  createTasks // se crea la tarea
);

// Actualizar uno solo 
router.put('/tasks/:id', authRequire, updateTasks);

// Eliminar uno solo
router.delete('/tasks/:id', authRequire, deleteTasks);



export default router;