import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const tabSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  items: [taskSchema],
}, {
  timestamps: true,
});

const Tab = mongoose.model('Tab', tabSchema);

export default Tab;
