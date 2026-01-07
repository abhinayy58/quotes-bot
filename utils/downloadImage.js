import fs from "fs";
import path from "path";
import https from "https";

export const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const dir = "./output/images";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, `${Date.now()}.png`);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close(() => resolve(filePath));
      });
    }).on("error", (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
};
