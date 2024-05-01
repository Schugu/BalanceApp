import mongoose from "mongoose";

// Datos que esperamos recibir de una task
const movimientosSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require:true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
}, {
  timestamps: true
});

export default mongoose.model('movimientos', movimientosSchema);