import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import resourcesRouter from './routes/resources.js';
import { errorHandler } from './middleware/error-handler.js'; // Ticket RC008

const PORT = process.env.PORT || 5002;

const app = express();

// Middleware (pre-routes)
app.use(express.json());

app.use(cors());
// Routes
app.use('/resources', resourcesRouter);

// Middleware (post-routes)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});