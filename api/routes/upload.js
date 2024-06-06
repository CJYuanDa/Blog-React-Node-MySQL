import express from 'express';
import multer from 'multer';
import { uploadPhoto } from '../controllers/upload.js';

const router = express.Router();

const img = multer.diskStorage({
    destination: function (req, file, cb) {
        // STORE THE FILE TO SERVER DIRECTORY '../client/public/upload'
        cb(null, '../client/public/upload')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const headShot = multer.diskStorage({
    destination: function (req, file, cb) {
        // STORE THE FILE TO SERVER DIRECTORY '../client/public/headshot'
        cb(null, '../client/public/headshot')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: img });
const upload_headshot = multer({ storage: headShot });

router.post('/img', upload.single('file'), uploadPhoto);
router.post('/headshot', upload_headshot.single('file'), uploadPhoto);

export default router;