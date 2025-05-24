import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { foodRoutes } from './routes';
import { authRoutes } from './routes/authRoutes';
import { authMiddleware } from './middleware/auth';
import { dashboardRoutes } from './routes/dashboardRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8080',  // Update this to match your frontend URL
  credentials: true
}));

app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Auth routes (unprotected)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/food', authMiddleware, foodRoutes);
app.use('/api/dashboard', dashboardRoutes); // Register the dashboard route

mongoose.set('debug', true);

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Food')
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Collections:', mongoose.connection.collections);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});