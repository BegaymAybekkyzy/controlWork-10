import express from "express";
import mysqlDb from "./mysqlDb";
import cors from "cors";
import newRouter from "./routers/news";
import commentRouter from "./routers/comments";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/news", newRouter);
app.use("/comments", commentRouter);

const run = async () => {
    await mysqlDb.init();

    app.listen(port, () => {
        console.log(`Server started http://localhost:${port}`);
    });
};

run().catch(console.error);
