import express from "express";
import mongoose from "mongoose";
import DB_URL from "./src/configs/db.config.js";
import roleRouter from "./src/routes/Role.js";

const app = express();
const port = 3080;

app.use(express.json());
app.use("/api", roleRouter);

app.get("/", (_, res) => {
    res.send("hello");
});

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(port, () => console.log(`Running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

startApp();
