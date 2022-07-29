import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRouter.js'
import connectDB from './dbConfig.js';

const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));