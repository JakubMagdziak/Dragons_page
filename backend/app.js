import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import newsRoutes from './routes/news.js';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js'; // jeśli używasz multer
import contactRoutes from './routes/contact.js'; // jeśli masz endpoint do kontaktu

import dotenv from 'dotenv';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Public folder for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Simple test route (optional)
app.get('/api/ping', (req, res) => res.send('pong'));

export default app;
