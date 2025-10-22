import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./server/routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

const port = 3002;
app.listen(port, () => {
  console.log(`Test server running on http://localhost:${port}`);
});
