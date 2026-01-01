import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    used: { type: Boolean, default: false },
    usedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
