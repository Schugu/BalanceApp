// Para importar en node.js utilizando import y no require se debe poner "type":"module" 
// en las propiedades package.json (Esto significa que se puedan ocupar los modulos de ES6).

// Importar express.
import express from 'express';

// Importar morgan
import morgan from 'morgan';

// Importar el cookie-parser
import cookieParser from 'cookie-parser';

// Importar authRoutes
import authRoutes from './routes/auth.routes.js';

// Importar task.routes.js 
import taskRoutes from './routes/task.routes.js'

// Importar el cors
import cors from "cors";


// Inicializar express y almacenar el objeto que nos devuelve en la constante app.
const app = express();

// App utiliza el modulo morgan con su configuración dev. 
app.use(morgan('dev'));

// Para transofrmar los req body en json o formato de javascript.
app.use(express.json()); 

// Para transformar las cookies en un objeto JSON.
app.use(cookieParser());

// Utilizar cors, configurarlo de manera que solo el dominio establecido se pueda comunicar
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Que app utilice el authRoutes
app.use('/api', authRoutes);

// Que app utilice el taskRoutes
app.use('/api', taskRoutes);

export default app 



