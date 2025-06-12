import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  date: { type: Date, default: Date.now }
});

const News = mongoose.model('News', newsSchema);

export default News;
