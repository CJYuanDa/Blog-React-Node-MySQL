import db from '../database.js';
import jwt from 'jsonwebtoken';

export function getPosts(req, res) {
    const q = req.query.cat ? 'SELECT * FROM posts WHERE cat = ? ORDER BY id DESC' : 'SELECT * FROM posts ORDER BY id DESC';
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
export function getPost(req, res) {
    const q = 'SELECT posts.id AS id, users.username AS username, title, description, posts.img AS img, users.img AS userImg, date, cat FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?';
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
}
export function addPost(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if(err) return res.status(403).json('Token is not valid');
        const q = 'INSERT INTO posts (title, description, img, cat, date, user_id) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [
            req.body.title,
            req.body.description,
            req.body.img,
            req.body.cat ? req.body.cat : 'others',
            req.body.date,
            userInfo.id
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.json('Post has been created.');
        });
    });
}

export function deletePost(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if(err) return res.status(403).json('Token is not valid');

        const postId = req.params.id;
        const q = 'DELETE FROM posts WHERE id = ? AND user_id = ?'
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json('You can delete only your post!');
            return res.json('Post has been deleted');
        })
    });
}
export function updatePost(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
        if(err) return res.status(403).json('Token is not valid');
        const postId = req.params.id;
        const q = 'UPDATE posts SET title = ?, description = ?, img = ?, cat = ? WHERE id = ? AND user_id = ?';
        const values = [
            req.body.title,
            req.body.description,
            req.body.img,
            req.body.cat,
            postId,
            userInfo.id
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json('Post has been updated.');
        });
    });
}