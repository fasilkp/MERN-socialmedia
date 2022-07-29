import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './dbConfig.js';
import postRoutes from './routes/postRoutes.js'

const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/posts", postRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));