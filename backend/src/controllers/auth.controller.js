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

// Importar el uploadFile para el firebase
import { uploadFile, profilePhotoExists, deleteFile } from "../util/uploadFile.js";

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
      password: passwordHash,
      saldo: 0
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
      updatedAt: userSaved.updatedAt,
      saldo: userSaved.saldo
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
      updatedAt: userFound.updatedAt,
      saldo: userFound.saldo
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
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  // Si el usuario es encontrado retornar lo siguiente:
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    saldo: userFound.saldo,
    profilePhoto: {
      urlImage: userFound.profilePhoto.urlImage
    }
  });
};

// Peticion que se realiza cada vez que la página cargue
export const verifyToken = async (req, res) => {
  // Almacenar el token
  const { token } = req.cookies;

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


// Obtener perfiles
export const getProfiles = async (req, res) => {
  try {
    // Utiliza el método find() de Mongoose para buscar todos los perfiles de usuarios
    const profiles = await User.find();

    // Devuelve los perfiles de usuarios como respuesta
    res.json(profiles);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la búsqueda de perfiles
    res.status(500).json({ message: 'Error fetching profiles' });
  }
}

// Obtener perfil por id
export const getProfileById = async (req, res) => {
  try {
    // Utiliza el método findById() de Mongoose para buscar un perfil de usuario por su ID
    const profile = await User.findById(req.params.id);

    // Si no se encuentra ningún perfil con ese ID, devuelve un mensaje de error
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Si se encuentra el perfil, devuélvelo como respuesta
    res.json(profile);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la búsqueda del perfil por ID
    res.status(500).json({ message: 'Error fetching profile' });
  }
}

// Editar user por id
export const updateProfileById = async (req, res) => {
  try {
    // El params significa el dato de la URL que nos esten pasando
    // Buscar un perfil por el id y actualizarlo.
    const userFound = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true // Esto significa que nos debe dar el dato actualizado y no el anterior. 
    });

    // Si no encontró ninguna tarea devolver un mensaje de error 
    if (!userFound) return res.status(404).json({ message: 'User not found.' });

    // Si se encontro y se actualizó la tarea, devolverla.
    res.json(userFound);
  } catch (error) {
    return res.status(404).json({ message: 'User not found' });
  }
}

// Eliminar user por id
export const deleteProfileById = async (req, res) => {
  try {
    // Utiliza el método findByIdAndDelete() de Mongoose para buscar y eliminar un perfil de usuario por su ID
    const deletedProfile = await User.findByIdAndDelete(req.params.id);

    // Si no se encuentra ningún perfil con ese ID, devuelve un mensaje de error
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Si se elimina correctamente, devuelve el perfil eliminado como respuesta
    res.json({ message: 'Profile deleted successfully', deletedProfile });
  } catch (error) {
    // Maneja cualquier error que ocurra durante la eliminación del perfil por ID
    res.status(500).json({ message: 'Error deleting profile' });
  }
}


// Cargar imagen de usuario 
export const getProfilePhoto = async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);

    if (!usuario || !usuario.profilePhoto) {
      return res.status(404).send('Imagen de usuario no encontrada.');
    }

    res.status(200).json({ usuario });

  } catch (error) {
    res.status(400).json({ message: 'Error al recuperar la imagen de usuario.' });
  }
};

export const uploadProfilePhoto = async (req, res) => {
  const image = req.files.profilePhoto;

  if (image && image.length > 0) {
    const usuario = await User.findById(req.user.id);


    const photoExists = await profilePhotoExists(usuario._id);

    if (photoExists) {
      await deleteFile(`files/ProfilePhotoOf${usuario._id}`);
      console.log("Foto anterior borrada");
    }

    const { downloadUrl } = await uploadFile(image[0], usuario._id);

    usuario.profilePhoto = {
      urlImage: downloadUrl,
    };
    await usuario.save();
    console.log("Foto nueva creada")

    return res.status(200).json({ usuario });
  }

  return res.status(400).json({ message: 'Debes enviar una imagen' });
};

