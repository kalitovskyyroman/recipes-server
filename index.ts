import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import roleRouter from "./src/routes/role.router";
import authRouter from "./src/routes/auth.router";
import userRouter from "./src/routes/user.router";
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
app.use(path, authRouter);
app.use(path, userRouter);
app.use(errorMiddleware);

app.get("/", (req: Request, res: Response) => {
    res.send("Server works...");
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
