import express from "express";

const app = express();
const port = 3080;

app.get("/", (_, res) => {
    res.send("hello");
});

app.listen(port, () => console.log(`Running on port ${port}`));
