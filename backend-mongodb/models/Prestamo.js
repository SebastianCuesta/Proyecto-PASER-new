import mongoose from "mongoose";

const prestamoSchema = new mongoose.Schema(
  {
    nombreAprendiz: { type: String, required: true },
    identificacion: {type:Number, required: true},
    ficha: {type:Number, required:true},
    productoSeleccionado: {type: String, required:true},
    cantidad: { type: Number, required: true },
    fechaEntrega: { type: Date, },
    fechaDevolucion: { type: Date, },
    estado: {
      type: String,
      enum: ["En buen estado", "Regular", "Malo"],
    },
    descripcion: { type: String },

   
  },
  { timestamps: true }
);

export default mongoose.model("Prestamo", prestamoSchema);
