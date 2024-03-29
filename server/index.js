import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from './dbConfig.js';
import postRoutes from './routes/postRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
// database connection
connectDB();

// middlewares
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(cookieParser());
app.use('/images', express.static('images'));
app.use(
  cors({
    origin: ["https://crowdly.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
app.get('/', (req, res)=>{
  res.send("app running successfull")
})
// routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));