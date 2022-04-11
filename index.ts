import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import roleRouter from "./src/routes/role.router";
// import userRouter from "./src/routes/user.router.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./src/middleware/errors.middleware";

config();

const app: Express = express();
const PORT = process.env.PORT || 3080;
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
app.use(errorMiddleware);
// app.use(path, userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const startApp = async () => {
    try {
        await mongoose.connect(process.env.DB_URI!);
        app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

startApp();
