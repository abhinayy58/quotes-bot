import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Quote from "../models/Quote.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const quotes = JSON.parse(
  fs.readFileSync("./data/quotes.json", "utf-8")
);

for (const q of quotes) {
  try {
    await Quote.create(q);
  } catch {}
}

console.log("Quotes Imported");
process.exit();
