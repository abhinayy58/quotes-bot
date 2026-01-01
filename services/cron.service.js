import cron from "node-cron";
import fs from "fs/promises";
import Quote from "../models/Quote.js";
import { generateImage } from "./image.service.js";
import { sendEmail } from "./email.service.js";
import { generateCaptionAndHashtags } from "./gemini.service.js";

cron.schedule("0 8,20 * * *", async () => {
  let imagePath;

  try {
    const quote = await Quote.findOne({ used: false });

    if (!quote) {
      await Quote.updateMany({}, { used: false });
      return;
    }

    const caption = await generateCaptionAndHashtags(
      quote.quote,
      quote.name
    );

    imagePath = await generateImage(quote.quote, quote.name);

    await sendEmail(imagePath, caption);

    // ✅ DELETE IMAGE AFTER EMAIL SENT
    await fs.unlink(imagePath);

    quote.used = true;
    quote.usedAt = new Date();
    await quote.save();

    console.log("Daily quote sent & image deleted");
  } catch (error) {
    console.error("Cron job failed:", error);

    // Optional: cleanup if email failed after image generation
    if (imagePath) {
      try {
        await fs.unlink(imagePath);
      } catch (_) {}
    }
  }
},{
  timezone: "Asia/Kolkata"
});

