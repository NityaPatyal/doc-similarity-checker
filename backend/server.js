import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import documentRoutes from './src/routes/documentRoutes.js';
import connectDB from './src/config/db.js';
import rateLimit from 'express-rate-limit';
import logger from './src/utils/logger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { error: "Too many requests, please try again later." }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/documents', documentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use(limiter);
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});