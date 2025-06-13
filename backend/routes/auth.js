import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('🔐 Login próba:', { username });

  const admin = await AdminUser.findOne({ username });
  if (!admin) {
    console.log('❌ Nie znaleziono użytkownika');
    return res.status(401).json({ error: 'Nieprawidłowy login' });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    console.log('❌ Nieprawidłowe hasło');
    return res.status(401).json({ error: 'Nieprawidłowe hasło' });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  console.log('✅ Login OK - token wygenerowany');
  res.json({ token });
});


export default router;
