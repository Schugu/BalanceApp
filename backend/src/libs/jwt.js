// Importar key secreta 
import { TOKEN_SECRET } from '../config.js';

// Importar el modulo jsonwebtoken
import jwt from 'jsonwebtoken';

// funcion para crear tokens 
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Crear un JSON Web Token
    jwt.sign(
      payload, // Payload : datos para incluir en el JWT
      TOKEN_SECRET,  // Secret : clave secreta para verificar el JWT
      {
        expiresIn: '1d', // Opciones
      },
      // Callback
      (err, token) => {
        if (err) reject(err); // Si todo sale mal
        resolve(token); // Si todo sale bien
      }
    );
  });
}