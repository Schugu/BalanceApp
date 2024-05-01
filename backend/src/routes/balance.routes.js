// Importar el enrutador de express y ejecutarlo
import { Router } from "express";
const router = Router();

// Importar la función authRequire de validateToken.js
import { authRequire } from '../middlewares/validateToken.js'

// Importar funciones del tasks.controller.js
import {
  createMovimiento,
  getMovimientos,
  getMovimiento,
  updateMovimiento,
  deleteMovimiento
} from '../controllers/balance.controller.js'

// Importar el validator.middleware
import {validateSchema} from '../middlewares/validator.middleware.js'

// Importar el schema de tasks
import { createMovimientoSchema } from '../schemas/movimiento.schema.js'

// RUTAS
// Crear
router.post(
  '/balance', 
  authRequire, // se valida si el usuario esta autenticado
  validateSchema(createMovimientoSchema), // se validan los datos
  createMovimiento // se crea el saldo
);

// Obtener
router.get('/balance', authRequire, getMovimientos);

// Obtener uno solo
router.get('/balance/:id', authRequire, getMovimiento);

// // Actualizar uno solo 
router.put('/balance/:id', authRequire, updateMovimiento);

// Eliminar uno solo
router.delete('/balance/:id', authRequire, deleteMovimiento);



export default router;