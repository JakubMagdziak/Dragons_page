import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  tags: [String],
  status: {
    type: String,
    enum: ['planowany', 'w trakcie', 'zakończony'],
    default: 'planowany',
  },
  createdAt: { type: Date, default: Date.now },
});


const Project = mongoose.model('Project', projectSchema);

export default Project;
