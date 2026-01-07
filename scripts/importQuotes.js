// import fs from "fs";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import Quote from "../models/Quote.js";

// dotenv.config();
// await mongoose.connect(process.env.MONGO_URI);

// const quotes = JSON.parse(
//   fs.readFileSync("./data/quotes.json", "utf-8")
// );
// for (const q of quotes) {
//   try {
//     await Quote.create({
//       ...q,
//       caption: q.caption || "",
//       hashtags: q.hashtags || [],
//       imgUrl: q.imgUrl || null
//     });
//   } catch (err) {
//     if (err.code !== 11000) {
//       console.error(err.message);
//     }
//   }
// }

// console.log("Quotes Imported");
// process.exit();
