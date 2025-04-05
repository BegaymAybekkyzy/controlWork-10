import express from "express";
import mysqlDb from "../mysqlDb";
import {IComment, ICommentMutation, INews} from "../types";
import {ResultSetHeader} from "mysql2";

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
    try {
        const queryID = req.query.news_id as string;

        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM comments');
        const comments = result as IComment[];

        if (!queryID) {
            res.send(comments);
            return;
        }

        const commentsByID = comments.filter((comment) => comment.news_id === Number(queryID));
        res.send(commentsByID);
    } catch (err) {
        res.status(500).send(err);
    }
});

commentRouter.post('/', async (req, res) => {
    try {
        const connection = await mysqlDb.getConnection();

        if (!req.body.news_id || !req.body.text || req.body.text.trim() === "") {
            res.status(400).send({error: "No mandatory fields"});
            return;
        }

        const [newsResult] = await connection.query('SELECT id FROM news WHERE id = ?',
            [req.body.news_id]
        );

        const newsById = newsResult as [];

        if (newsById.length === 0) {
            res.status(400).send({error: "There's no such news"});
            return;
        }

        console.log(newsResult);

        const newComment: ICommentMutation = {
            news_id: req.body.news_id,
            author: req.body.author ? req.body.author : "Anonymous",
            text: req.body.text,
        };


        const [result] = await connection.query('INSERT INTO comments (news_id, author, text) VALUES(?, ?, ?)',
            [newComment.news_id, newComment.author, newComment.text]
        );

        const resultHeader = result as ResultSetHeader;
        const id = resultHeader.insertId;

        const [oneComment] = await connection.query('SELECT * FROM comments WHERE id = ?', [id]);
        const comment = oneComment as IComment[];
        res.send(comment[0]);

    } catch (err) {
        res.status(500).send(err);
    }
});

commentRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const connection = await mysqlDb.getConnection();
        await connection.query('DELETE FROM comments WHERE id = ?', [id]);

        res.send("Comment removed")
    } catch (err) {
        res.status(500).send(err);
    }
});


export default commentRouter;