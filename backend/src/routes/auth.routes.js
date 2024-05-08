// Importar funcion Router de express.
import { Router } from "express";

// Importar las funciones de auth.controller.js.
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
  getProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
  uploadProfilePhoto,
  getProfilePhoto,
  deleteProfilePhoto
} from '../controllers/auth.controller.js';

// Importar el authRequiere de validateToken.js
import { authRequire } from "../middlewares/validateToken.js";

// Importar el middleware validator
import { validateSchema } from '../middlewares/validator.middleware.js'

// Importar el auth.schema
import { registerSchema, loginSchema, balanceSchema } from '../schemas/auth.schema.js'


// Importar el multer import
// import multer from "multer";
// export const upload = multer({ dest: './src/storage/imgs' });
import { upload } from "../libs/multer.js";




// Guardar objeto dado por Router en una const
const router = Router();

// Crear rutas
// Cuando se haga una peticion post a: "" , ejecutar la funcion: "". 
router.post('/register', validateSchema(registerSchema), register);

router.post('/login', validateSchema(loginSchema), login);

router.post('/logout', logout);

router.get('/verify', verifyToken);

router.get('/profile', authRequire, profile);

// Funciones para profile 

// Obtener perfiles
router.get('/profiles', authRequire, getProfiles);

// Obtener un perfil por id
router.get('/profiles/:id', authRequire, getProfileById);

// Actualizar un perfil por id
router.put('/profiles/:id', authRequire, validateSchema(balanceSchema), updateProfileById);

// Eliminar un perfil por id
router.delete('/profiles/:id', authRequire, deleteProfileById);

// ruta para agregar foto
router.post(
  '/profiles/:id/profile-photo',
  authRequire,
  upload.fields([{ name: 'profilePhoto', maxCount: 1}]),
  uploadProfilePhoto
);

router.get('/profiles/:id/profile-photo', authRequire, getProfilePhoto);

router.delete('/profiles/:id/profile-photo', authRequire, deleteProfilePhoto);




export default router;