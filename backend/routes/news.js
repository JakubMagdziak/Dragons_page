import express from 'express';
import News from '../models/News.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();


// 🔓 GET /api/news – publiczne pobieranie wszystkich newsów
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Błąd pobierania newsów' });
  }
});

// 🔐 POST /api/news – dodanie nowego newsa (tylko admin)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, imageUrl, createdAt } = req.body;
    const news = await News.create({
      title,
      content,
      imageUrl,
      createdAt: createdAt || new Date()
    });
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: 'Błąd dodawania newsa' });
  }
});

// 🔐 PUT /api/news/:id – edycja istniejącego newsa (tylko admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, imageUrl, createdAt } = req.body;
    const updated = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl, createdAt: createdAt || new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Błąd edycji newsa' });
  }
});

// 🔐 DELETE /api/news/:id – usunięcie newsa (tylko admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania newsa' });
  }
});

// Na końcu pliku
export default router;

