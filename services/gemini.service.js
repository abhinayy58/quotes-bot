import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateCaptionAndHashtags = async (quote, author) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `
Create an Instagram caption for a motivational nature post.

Quote (DO NOT repeat or rephrase this): "${quote}"
Author: ${author}

Rules:
- Description must be DIFFERENT from the quote
- Do NOT paraphrase the quote
- Calm, positive, inspirational tone
- Focus on nature, mindfulness, and personal growth
- Write 1–2 short lines as the description
- Add 5–7 relevant hashtags
- Maximum 2 emojis (optional)
- No markdown, no bullet points
- Output only plain text

Format:
<description>

#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5
`;


  const result = await model.generateContent(prompt);
  const response = result.response.text();

  return response;
};
