// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import fs from "fs";

// import Quote from "../models/Quote.js";
// import { generateImage } from "../services/image.service.js";
// import { uploadImageToCloudinary } from "../services/cloudinary.service.js";
// import { getRandomHashtags } from "../utils/randomHashtags.js";

// await mongoose.connect(process.env.MONGO_URI);

// const quotes = await Quote.find({
//   imgUrl: { $in: [null, ""] }
// });

// console.log(`📌 Processing ${quotes.length} quotes`);

// for (const q of quotes) {
//   try {
//     console.log(`⚙️ ${q.quote.slice(0, 40)}...`);

//     // 1️⃣ Generate image
//     const imagePath = await generateImage(q.quote, q.name);

//     // 2️⃣ Upload to Cloudinary
//     const imgUrl = await uploadImageToCloudinary(imagePath);

//     // 3️⃣ Generate hashtags (STATIC POOL)
//     const hashtags = getRandomHashtags(5);

//     // 4️⃣ Save to DB
//     await Quote.findByIdAndUpdate(q._id, {
//       caption: q.quote, // or "" if you prefer
//       hashtags,
//       imgUrl
//     });

//     fs.unlinkSync(imagePath);

//     console.log("✅ Done\n");

//     // ⏳ safe delay
//     await new Promise(r => setTimeout(r, 1500));
//   } catch (err) {
//     console.error("❌ Failed:", err.message);
//   }
// }

// console.log("🎉 All quotes processed");
// process.exit();
