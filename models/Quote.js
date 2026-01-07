import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    caption: {
      type: String,
      trim: true
    },

    hashtags: {
      type: [String], // store as array for easy manipulation
      default: []
    },

    imgUrl: {
      type: String,
      trim: true
    },

    used: {
      type: Boolean,
      default: false
    },

    usedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
