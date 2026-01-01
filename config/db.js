import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";

  if (!uri) {
    console.error("❌ MONGO_URI is missing");
    throw new Error("MONGO_URI is missing");
  }

  try {
    await mongoose.connect(uri, {
      dbName: "test", // your DB name
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB;
