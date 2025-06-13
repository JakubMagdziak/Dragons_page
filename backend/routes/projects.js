import express from 'express';
import Project from '../models/Project.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// GET – publiczny
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST – tylko admin
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, tags, createdAt } = req.body;
    const project = await Project.create({
      title,
      description,
      tags,
      createdAt: createdAt || new Date(),
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Błąd zapisu' });
  }
});

// PUT – tylko admin
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, tags, createdAt } = req.body;
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, tags, createdAt: createdAt || new Date() },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Błąd edycji' });
  }
});

// DELETE – tylko admin
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania' });
  }
});

export default router;
