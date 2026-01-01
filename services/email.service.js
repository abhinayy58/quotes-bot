import { transporter } from "../config/mailer.js";

export const sendEmail = async (imagePath,text) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: "Daily Motivation POST🌿",
    text: text,
    attachments: [{ path: imagePath }]
  });
};
