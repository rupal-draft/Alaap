import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import { readdirSync } from "fs";
import morgan from "morgan";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND],
  })
);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
