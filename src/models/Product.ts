import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      enum: ["merchandise", "supplement", "accessory"],
      required: true,
    },
    benefits: {
      type: String,
      default: "", // e.g., "Supports fast muscle tissue repair"
    },
    image: {
      type: String,
      required: true, // Placeholder or generated asset URL
    },
    stock: {
      type: Number,
      default: 50,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
