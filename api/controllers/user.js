import db from '../database.js';
import jwt from 'jsonwebtoken';

export function updateUser(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');
    const {id: user_id} = jwt.verify(token, process.env.SECRET_KEY);
    const q = "UPDATE users SET username = ?, email = ?, img = ? WHERE id = ?;";
    const value = [
        req.body.username,
        req.body.email,
        req.body.img,
        user_id
    ];
    db.query(q, value, (err, data) => {
        if (err) {
            console.log('error:', err);
            return res.status(500).json(err);
        }
        return res.clearCookie('access_token', {
            sameSite: 'none',
            secure: true
        }).status(200).json('User has been updated');
    });
}

export function deleteUser(req, res) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not authenticated!');
    const {id: user_id} = jwt.verify(token, process.env.SECRET_KEY);
    const q = 'DELETE FROM users WHERE id = ?';
    db.query(q, [user_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json('User has been deleted');
    });
}