import dotenv from "dotenv";
dotenv.config(); // MUST be FIRST
import fetch from "node-fetch";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export const getNatureImage = async () => {
    if (!PEXELS_API_KEY) {
    console.error("❌ PEXELS_API_KEY missing");
    return "https://picsum.photos/1080"; // fallback
  }
 try {
    const res = await fetch(
      "https://api.pexels.com/v1/search?query=nature&orientation=square&per_page=30",
      {
        headers: {
          Authorization: PEXELS_API_KEY
        }
      }
    );

    const data = await res.json();

    if (!data.photos || data.photos.length === 0) {
      console.warn("⚠️ Pexels returned empty, using fallback");
      return "https://picsum.photos/1080";
    }

    const photo =
      data.photos[Math.floor(Math.random() * data.photos.length)];

    return photo.src.large;
  } catch (err) {
    console.error("❌ Pexels error:", err.message);
    return "https://picsum.photos/1080"; // safe fallback
  }
};
