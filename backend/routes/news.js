import express from 'express';
import News from '../models/News.js';

const router = express.Router();

// Pobierz wszystkie newsy
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 }).limit(5);
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dodaj nowy news
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const newNews = new News({ title, content });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
