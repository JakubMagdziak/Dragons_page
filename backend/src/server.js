import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import newsRoutes from '../routes/news.js';


const app = express();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/dragons-db';

app.use(cors());
app.use(express.json());

// Podłączamy router dla news
app.use('/news', newsRoutes);

// Podstawowy endpoint do testów
app.get('/', (req, res) => {
  res.send('Backend działa!');
});

// Połączenie z MongoDB i uruchomienie serwera
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Połączono z MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Błąd połączenia z MongoDB:', err);
  });
