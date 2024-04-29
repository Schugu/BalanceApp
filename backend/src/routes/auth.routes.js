// Importar funcion Router de express.
import { Router } from "express";

// Importar las funciones de auth.controller.js.
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js';

// Importar el authRequiere de validateToken.js
import { authRequire } from "../middlewares/validateToken.js";

// Importar el middleware validator
import { validateSchema } from '../middlewares/validator.middleware.js'

// Importar el auth.schema
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

// Guardar objeto dado por Router en una const
const router = Router();

// Crear rutas
// Cuando se haga una peticion post a: "" , ejecutar la funcion: "". 
router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify',  verifyToken);

router.get('/profile', authRequire, profile);


export default router;