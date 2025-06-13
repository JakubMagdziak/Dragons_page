import dotenv from 'dotenv';
import mongoose from 'mongoose';
import News from './models/News.js';
import Project from './models/Project.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await News.deleteMany({});
    await Project.deleteMany({});

    await News.insertMany([
      {
        title: 'Nowy wpis: Zaczynamy projekt honeypota',
        content: 'To będzie najbardziej zaawansowany honeypot, jaki widziało nasze koło!',
        createdAt: new Date()
      }
    ]);

    await Project.insertMany([
      {
        title: 'Projekt: VPN Monitor',
        description: 'System detekcji anomalii w tunelach VPN używany do uczenia maszynowego.',
        tags: ['vpn', 'security', 'ai'],
        createdAt: new Date()
      }
    ]);

    console.log('✅ Dane testowe dodane!');
    process.exit();
  })
  .catch(err => {
    console.error('Błąd połączenia z MongoDB:', err);
    process.exit(1);
  });
