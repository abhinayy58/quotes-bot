import fs from "fs";
import puppeteer from "puppeteer";
import { getNatureImage } from "./pexels.service.js";

export const generateImage = async (quote, author) => {
  const imageUrl = await getNatureImage();

  let html = fs.readFileSync("./templates/quote.html", "utf-8")
    .replace(/{{QUOTE}}/g, quote)
    .replace(/{{AUTHOR}}/g, author)
    .replace(/{{IMAGE_URL}}/g, imageUrl);

  fs.mkdirSync("./output/images", { recursive: true });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  // 🔥 HIGH DPI (THIS MAKES IMAGE CRYSTAL CLEAR)
  await page.setViewport({
    width: 360,
    height: 360,
    deviceScaleFactor: 3 // 👈 KEY LINE
  });

  await page.setContent(html, { waitUntil: "networkidle0" });

await page.evaluate(() => {
  return new Promise((resolve) => {
    const div = document.querySelector(".post");
    const bg = div.style.backgroundImage;
    const url = bg.slice(5, -2);

    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve;
  });
});


const post = await page.$(".post");

if (!post) {
  throw new Error(".post element not found");
}


  const filePath = `./output/images/${Date.now()}.png`;

  await post.screenshot({
    path: filePath,
    type: "png",
    omitBackground: false
  });

  await browser.close();
  return filePath;
};
