// Importar mongoose 
import mongoose from 'mongoose'

// Importar config .env
import dotenv from 'dotenv';
dotenv.config();


// Crear funcion asyncrona
export const connectDB = async () => {
  // No siempre puede funcionar por eso se implementa el try/catch
  try {
    // Conectar a 
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('>>> DB is connected');
  } catch (error) {
    console.log(error);
  }
};
