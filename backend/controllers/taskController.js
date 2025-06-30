const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = await Task.create({ title, description, user: req.user.id });
  res.status(201).json(newTask);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  const updated = await task.save();
  res.json(updated);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
