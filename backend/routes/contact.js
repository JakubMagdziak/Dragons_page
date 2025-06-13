import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
  }

  console.log('📩 Nowa wiadomość:', { name, email, message });
  res.status(200).json({ success: true });
});

export default router;
