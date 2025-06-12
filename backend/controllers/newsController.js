const News = require("../models/News");

// Pobierz wszystkie newsy (posortowane malejąco wg daty)
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Dodaj newsa
exports.createNews = async (req, res) => {
  const { title, date, summary, content } = req.body;
  const news = new News({ title, date, summary, content });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// (opcjonalnie) Edytuj news, Usuń news itd.
