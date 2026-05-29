import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import prdRoutes from './routes/prdRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/prds', prdRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('PRDify API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
