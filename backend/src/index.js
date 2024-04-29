import app from './app.js'

// Acá puse entre llaves la funcion a importar para desestructurar el archivo y solo pedir eso.
import {connectDB} from './db.js'

// Conexion a la base de datos.
connectDB();

// Inicio de servidor  
app.listen(4000);
console.log('Server on port', 4000);
