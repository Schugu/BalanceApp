import mongoose from 'mongoose';

// Datos que esperamos guardar de los usuarios. 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  saldo: {
    type: Number,
    min: 0, 
    required: true,
  },
  profilePhoto: {
    urlImage: {
      type: String,
      required: false
    }
  }
}, {
  timestamps: true
});

// Esto para interactuar con la base de datos con los métodos.
export default mongoose.model('User', userSchema);
