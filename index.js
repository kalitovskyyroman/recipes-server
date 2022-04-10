import express from "express";
import mongoose from "mongoose";
import roleRouter from "./src/routes/Role.js";
import userRouter from "./src/routes/user.router.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();
const port = 3080;
const path = "/api";

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);

app.use(path, roleRouter);
app.use(path, userRouter);

app.get("/", (_, res) => {
    res.send("hello");
});

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        app.listen(port, () => console.log(`Running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

startApp();
