const express = require('express');
const router = express.Router();
const Tab = require('../models/Tab');

// Add task to tab
router.post('/:tabId/tasks', async (req, res) => {
  try {
    const tab = await Tab.findById(req.params.tabId);
    if (!tab) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    tab.items.push(req.body);
    const savedTab = await tab.save();
    
    // Return the newly added task
    const newTask = savedTab.items[savedTab.items.length - 1];
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task in tab
router.put('/:tabId/tasks/:taskId', async (req, res) => {
  try {
    const { version } = req.body;
    
    // Find tab with version check
    const tab = await Tab.findById(req.params.tabId);
    if (!tab) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    // Version conflict check
    if (version !== undefined && tab.version !== version) {
      return res.status(409).json({ 
        error: 'Version conflict. Please refresh and try again.',
        currentVersion: tab.version,
        expectedVersion: version
      });
    }

    const task = tab.items.id(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    Object.assign(task, req.body);
    tab.version += 1; // Increment version
    await tab.save();
    
    res.json({ ...task.toObject(), version: tab.version });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task from tab
router.delete('/:tabId/tasks/:taskId', async (req, res) => {
  try {
    const tab = await Tab.findById(req.params.tabId);
    if (!tab) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    const taskIndex = tab.items.findIndex(item => item._id.toString() === req.params.taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tab.items.splice(taskIndex, 1);
    await tab.save();
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Move task between tabs
router.put('/:fromTabId/tasks/:taskId/move', async (req, res) => {
  try {
    const { toTabId } = req.body;
    const fromTab = await Tab.findById(req.params.fromTabId);
    const toTab = await Tab.findById(toTabId);
    
    if (!fromTab || !toTab) {
      return res.status(404).json({ error: 'Tab not found' });
    }

    const taskIndex = fromTab.items.findIndex(item => item._id.toString() === req.params.taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Get the task data
    const taskData = fromTab.items[taskIndex];
    
    // Remove task from source tab
    fromTab.items.splice(taskIndex, 1);
    await fromTab.save();

    // Add task to destination tab
    toTab.items.push(taskData);
    await toTab.save();
    
    res.json({ message: 'Task moved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
