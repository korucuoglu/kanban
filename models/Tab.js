const mongoose = require('mongoose');

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
  version: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Tab = mongoose.model('Tab', tabSchema);

module.exports = Tab;
