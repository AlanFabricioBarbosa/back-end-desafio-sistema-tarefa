const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { name, cost, deadline, order } = req.body;
  try {
    const taskExists = await Task.findOne({ name });
    if (taskExists)
      return res.status(400).json({ message: "Nome da tarefa já existe" });

    const task = new Task({ name, cost, deadline, order });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, cost, deadline } = req.body;
  try {
    const taskExists = await Task.findOne({ name });
    if (taskExists && taskExists._id.toString() !== id)
      return res.status(400).json({ message: "Nome da tarefa já existe" });

    const task = await Task.findByIdAndUpdate(
      id,
      { name, cost, deadline },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
