import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/books", booksRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World, success GET Response");
});

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
