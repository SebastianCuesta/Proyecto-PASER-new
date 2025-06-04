import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombres: { type: String, required: true },
    cantidad: { type: Number, required: true },
    valor: { type: Number, required: true },
    imagen: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
