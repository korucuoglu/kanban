const express = require('express');
const router = express.Router();
const Tab = require('../models/Tab');

// Get all tabs
router.get('/', async (req, res) => {
  try {
    const tabs = await Tab.find().sort({ createdAt: 1 });
    res.json(tabs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new tab
router.post('/', async (req, res) => {
  try {
    const tab = new Tab(req.body);
    const savedTab = await tab.save();
    res.status(201).json(savedTab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update tab
router.put('/:id', async (req, res) => {
  try {
    const tab = await Tab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tab) {
      return res.status(404).json({ error: 'Tab not found' });
    }
    res.json(tab);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete tab
router.delete('/:id', async (req, res) => {
  try {
    const tab = await Tab.findByIdAndDelete(req.params.id);
    if (!tab) {
      return res.status(404).json({ error: 'Tab not found' });
    }
    res.json({ message: 'Tab deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
