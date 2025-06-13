import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AdminUser from './models/AdminUser.js';

dotenv.config();

(async () => {
  mongoose.connect('mongodb://localhost:27017/dragonsdb');

  const hash = await bcrypt.hash('admin123', 10);
  await AdminUser.create({ username: 'admin', passwordHash: hash });
  console.log('✅ Konto admina utworzone');
  process.exit();
})();
