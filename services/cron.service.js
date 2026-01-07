import cron from "node-cron";
import fs from "fs/promises";
import Quote from "../models/Quote.js";
import { sendEmail } from "./email.service.js";
import { downloadImage } from "../utils/downloadImage.js";
import { getCaptionFromDB } from "./caption.service.js";

cron.schedule("0 8,20 * * *",  async () => {
    let imagePath;

    try {
      const quote = await Quote.findOne({
        used: false,
        imgUrl: { $nin: ["", null] },
      });

      if (!quote) {
        await Quote.updateMany({}, { used: false });
        return;
      }

      // ✅ caption + hashtags FROM DB
      const captionText = getCaptionFromDB(quote);

      // ✅ download Cloudinary image
      imagePath = await downloadImage(quote.imgUrl);

      // ✅ send email
      await sendEmail(imagePath, captionText);

      // ✅ cleanup
      await fs.unlink(imagePath);

      quote.used = true;
      quote.usedAt = new Date();
      await quote.save();

      console.log("✅ Email sent using DB caption & hashtags");
    } catch (err) {
      console.error("❌ Cron failed:", err);

      if (imagePath) {
        try {
          await fs.unlink(imagePath);
        } catch (_) {}
      }
    }
  },
  {
    timezone: "Asia/Kolkata",
  });

