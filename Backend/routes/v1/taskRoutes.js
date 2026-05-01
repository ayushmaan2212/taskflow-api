const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const {
  getAllUserTasks,
  getAllAdminTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controllers/taskController");

const router = express.Router();

// All routes protected by auth middleware
router.use(authMiddleware);

// User task routes
router.get("/", getAllUserTasks);

router.post(
  "/",
  [body("title").notEmpty().withMessage("Task title is required")],
  createTask,
);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

// Admin-only route
router.get("/admin/all", roleMiddleware("admin"), getAllAdminTasks);

module.exports = router;
