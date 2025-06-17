const express = require('express');
const route = express.Router();
const Task = require('./model'); // Capitalized to match usage

// POST route to create a task
route.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});
route.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});


// GET route to filter tasks password :qTiY6m1xcJpwLcIV
route.get('/', async (req, res) => {
  try {
    const { statusbar, assignedto } = req.query;
    const filter = {};
    if (statusbar) filter.statusbar = statusbar;
    if (assignedto) filter.assignedto = assignedto;
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tasks' });
  }
});

// PATCH route to update a task
route.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = route;
