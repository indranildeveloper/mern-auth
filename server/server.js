import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Server is ready..."));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started at port ${port}`));
