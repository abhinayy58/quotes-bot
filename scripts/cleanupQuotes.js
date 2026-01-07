// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cloudinary from "cloudinary";
// import Quote from "../models/Quote.js"; // adjust path

// dotenv.config();

// // 🔹 CONNECT TO DB
// await mongoose.connect(process.env.MONGO_URI);
// console.log("MongoDB connected");

// // 🔹 Cloudinary config
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// function getPublicId(url) {
//   if (!url) return null;
//   const parts = url.split("/");
//   const filename = parts.at(-1);
//   return filename.split(".")[0];
// }

// async function cleanupQuotes() {
//   try {
//     const quotes = await Quote.find({
//       imgUrl: { $nin: ["", null] },
//       $expr: {
//         $gt: [{ $size: { $split: ["$quote", " "] } }, 22],
//       },
//     });

//     console.log(`Found ${quotes.length} quotes`);

//     for (const q of quotes) {
//       const publicId = getPublicId(q.imgUrl);

//       if (publicId) {
//         await cloudinary.v2.uploader.destroy(publicId);
//         console.log("Deleted:", publicId);
//       }

//       q.imgUrl = "";
//       await q.save();
//     }

//     console.log("Cleanup completed");
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await mongoose.disconnect();
//     console.log("MongoDB disconnected");
//   }
// }

// cleanupQuotes();
