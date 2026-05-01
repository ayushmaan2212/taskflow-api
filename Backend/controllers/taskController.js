const Task = require("../models/Task");
const { validationResult } = require("express-validator");

const getAllUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate(
      "createdBy",
      "name email",
    );

    return res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error retrieving tasks",
      data: null,
    });
  }
};

const getAllAdminTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      message: "All tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error retrieving tasks",
      data: null,
    });
  }
};

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      data: errors.array(),
    });
  }

  try {
    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description: description || "",
      status: status || "todo",
      createdBy: req.user.id,
    });

    await task.save();
    await task.populate("createdBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error creating task",
      data: null,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: null,
      });
    }

    // Check if user is owner or admin
    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this task",
        data: null,
      });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();
    await task.populate("createdBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error updating task",
      data: null,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: null,
      });
    }

    // Check if user is owner or admin
    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this task",
        data: null,
      });
    }

    await Task.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error deleting task",
      data: null,
    });
  }
};

module.exports = {
  getAllUserTasks,
  getAllAdminTasks,
  createTask,
  updateTask,
  deleteTask,
};
