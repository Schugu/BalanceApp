// Importar JWT
import jwt from "jsonwebtoken";

// Importar el TOKEN_SECRET
import { TOKEN_SECRET } from '../config.js';

// La funcion necesita estos 3 parametros para conciderarse un middleware
// el next significa que continue y que no retorne nada por que hay una 
// funcion que debe ejecutarse despues
export const authRequire = (req, res, next) => {
  // Almacenar token de las cookies
  const { token } = req.cookies;

  // Si no hay token devolver un mensaje de error
  if (!token) {
    console.log('No token, authorization denied');
  
    return res.status(401);
  };

  // Verificar si el token es valido.
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    // Si el token es invalido lanzar un mensaje de error
    if (err) return res.status(401).json({ message: 'Invalid token' });

    // Asignar el valor de user al req.user
    req.user = user;

    // Función del modulo express para que el código no se pare aquí
    next();
  });
};