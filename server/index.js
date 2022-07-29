import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './dbConfig.js';
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));