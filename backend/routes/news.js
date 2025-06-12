const auth = require('../middleware/authMiddleware');

// EDYCJA NEWS
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, imageUrl, createdAt } = req.body;
    const news = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        imageUrl,
        createdAt: createdAt || new Date()
      },
      { new: true }
    );
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: 'Błąd edycji' });
  }
});

// USUNIĘCIE NEWS
router.delete('/:id', auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Błąd usuwania' });
  }
});
