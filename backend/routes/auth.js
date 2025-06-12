const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await AdminUser.findOne({ username });
  if (!admin) return res.status(401).json({ error: 'Nieprawidłowy login' });

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return res.status(401).json({ error: 'Nieprawidłowe hasło' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

module.exports = router;
