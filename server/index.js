import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './dbConfig.js';
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import uploadPost from './middlewares/uploadFile.js';

const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static('images/'));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));