import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import "./services/cron.service.js";



dotenv.config();
connectDB();

const app = express();


// app.js or server.js
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
