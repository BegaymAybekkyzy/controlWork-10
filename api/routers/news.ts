import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader} from "mysql2";
import {INews, INewsMutation} from "../types";
import {ImageUpload} from "../multer";

const newRouter = express.Router();

newRouter.get("/", async (req, res) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT id, title, image, created_at FROM news');
        const news = result as INews[];
        res.send(news);

    } catch (err) {
        res.status(500).send(err);
    }
});

newRouter.post('/', ImageUpload.single("image"), async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            res.status(400).send({error: "No mandatory fields"});
            return;
        }

        if (req.body.title.trim() === "" || req.body.description.trim() === "") {
            res.status(400).send({error: "Fields should not be blank"});
            return;
        }

        const news: INewsMutation = {
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };

        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('INSERT INTO news (title, description, image) VALUES(?, ?, ?)',
            [news.title, news.description, news.image]
        );

        const resultHeader = result as ResultSetHeader;
        const id = resultHeader.insertId;

        const [oneNews] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const newsInfo = oneNews as INewsMutation[];
        res.send(newsInfo[0]);

    } catch (err) {
        res.status(500).send(err);
    }
});

newRouter.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const news = result as INews[];
        res.send(news[0]);

    } catch (err) {
        res.status(500).send(err);
    }
});

newRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const connection = await mysqlDb.getConnection();
        await connection.query('DELETE FROM news WHERE id = ?', [id]);

        res.send("News removed")
    }catch (err) {
        res.status(500).send(err);
    }
});

export default newRouter;