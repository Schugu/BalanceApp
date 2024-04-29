// Importar el modelo de usuario
import User from '../models/user.model.js'

// Importar el modulo bcryptjs
import bcrypt from 'bcryptjs'

// Importar la funcion createAccessToken de jwt.js
import { createAccessToken } from '../libs/jwt.js'

// Importar el JSON WEB TOKEN
import jwt from 'jsonwebtoken';

// Importar el TOKEN_SECRET
import { TOKEN_SECRET } from '../config.js';

// Funciones que nos permitan procesar peticiones.
export const register = async (req, res) => {
  // Extraer datos relevantes
  const { email, password, username } = req.body;
  
  try {
    // Buscar un usuario que coincida con el correo electrónico
    const userFound = await User.findOne({ $or: [{ email }, { username }] });

    // Si se encuentra un usuario con el mismo correo electrónico o nombre de usuario, devolver un mensaje de error personalizado
    if (userFound) {
      return res.status(400).json({ message: "Username or email is already in use" });
    }
    
    // Metodo de bcrypt que transforma un string en una serie de caracteres aleatorios. 
    // Esto va a encriptar la contraseña. El 10 indica cuantas veces se va a ejecutar el algoritmo. 
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: passwordHash
    });

    // Guardar el usuario en la base de datos
    const userSaved = await newUser.save();

    // Crear y guardar el token en una const 
    const token = await createAccessToken({ id: userSaved._id });

    // Metodo de express para establecer una cookie
    res.cookie('token', token);

    // Devolver el dato correcto al FrontEnd
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  // Extraer datos relevantes
  const { email, password } = req.body;

  try {
    // Encontrar un usuario por el correo
    const userFound = await User.findOne({ email });

    // Si no se encuentra el usuario lanzar un mensaje de error
    if (!userFound) return res.status(400).json({ message: 'User not found' });

    // Utilizar el metodo compare de bcrypt para comparar la contraseña que envia el usuario
    // con la contraseña del usuario de la base de datos
    const isMatch = await bcrypt.compare(password, userFound.password);

    // Si la contraseña no coincide lanzar un mensaje de error
    if (!isMatch) return res.status(400).json({ message: 'Incorrecto Password' });

    // Crear y guardar el token en una const 
    const token = await createAccessToken({ id: userFound._id });

    // Metodo de express para establecer una cookie
    res.cookie('token', token);

    // Devolver el dato correcto al FrontEnd
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  // Eliminar el token de las cookies
  res.cookie('token', '', {
    expires: new Date(0)
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  // Encontrar un usuario por su id
  const userFound = await User.findById(req.user.id);

  // Si no se encuentra el usuario lanzar un mensaje de error
  if(!userFound) return res.status(400).json({ message: 'User not found' });

  // Si el usuario es encontrado retornar lo siguiente:
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Peticion que se realiza cada vez que la página cargue
export const verifyToken = async (req, res) => {
  // Almacenar el token
  const {token} = req.cookies;

  // Si no hay token lanzar un mensaje de error.
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  // Verificar si el usuario existe
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    // Si hay un error lanzar un mensaje de error
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    // Si esta todo bien, buscar al usuario por el id y almacenarlo en una const
    const userFound = await User.findById(user.id);

    // Si no se encontró al usuario lanzar un mensaje de error
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

    // Si se encontro al usuario devolver un json con sus datos
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  });
}