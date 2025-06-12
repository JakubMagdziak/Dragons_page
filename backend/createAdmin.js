import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import AdminUser from './models/AdminUser.js';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash('admin123', 10);
  await AdminUser.create({ username: 'admin', passwordHash: hash });
  console.log('✅ Konto admina utworzone');
  process.exit();
})();
