const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // JSON parser

// Public folder for uploaded images (optional for later)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/news', require('./routes/news'));
app.use('/api/projects', require('./routes/projects'));
// app.use('/api/auth', require('./routes/auth')); ← do dodania w Etapie 4

app.use('/api/auth', require('./routes/auth'));

app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/projects', require('./routes/projects'));


// Simple test route (optional)
app.get('/api/ping', (req, res) => {
  res.json({ msg: 'pong' });
});

module.exports = app;
