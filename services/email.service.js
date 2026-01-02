import fs from "fs/promises";
import { resend } from "../config/mailer.js";

export const sendEmail = async (imagePath, text) => {
  const imageBuffer = await fs.readFile(imagePath);

  await resend.emails.send({
    from: process.env.EMAIL_USER,        // ex: "Nature Wisdom <onboarding@resend.dev>"
    to: process.env.RECEIVER_EMAIL,
    subject: "Daily Motivation POST 🌿",
    text: text,
    attachments: [
      {
        filename: "daily-quote.png",
        content: imageBuffer.toString("base64"),
        type: "image/png"
      }
    ]
  });
};
