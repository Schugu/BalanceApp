import mongoose from 'mongoose'

// Datos que esperamos guardar de los usuarios. 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
    trim: true
  },
  saldo: {
    type: Number,
    trim: true
  },
  ingresoTotal: {
    type: Number,
    trim: true
  },
  egresoTotal: {
    type: Number,
    trim: true
  }
}, {
  timestamps: true
});

              // Esto para interactuar con la base de datos con los metodos.
export default mongoose.model('User', userSchema);
