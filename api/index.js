import 'dotenv/config'
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 8800;
// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());


// ROUTE
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
    console.log('Connected!')
});