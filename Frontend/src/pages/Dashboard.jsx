import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // If user is admin, fetch all tasks, otherwise fetch user tasks
      const endpoint = user?.role === "admin" ? "/api/v1/tasks/admin/all" : "/api/v1/tasks";
      const response = await API.get(endpoint);
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      if (editingId) {
        // Update existing task
        const response = await API.put(`/api/v1/tasks/${editingId}`, formData);
        if (response.data.success) {
          setSuccess("Task updated successfully");
          setEditingId(null);
          fetchTasks();
        }
      } else {
        // Create new task
        const response = await API.post("/api/v1/tasks", formData);
        if (response.data.success) {
          setSuccess("Task created successfully");
          fetchTasks();
        }
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "todo",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to save task";
      setError(errorMessage);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      status: "todo",
    });
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const response = await API.delete(`/api/v1/tasks/${taskId}`);
      if (response.data.success) {
        setSuccess("Task deleted successfully");
        fetchTasks();
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete task";
      setError(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Task Manager Dashboard</h1>
          {user && (
            <p>
              Welcome, {user.name}! {user.role === "admin" && <span style={{ color: "#dc3545", fontWeight: "bold" }}>(Admin)</span>}
            </p>
          )}
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="dashboard-content">
        <div className="task-form-section">
          <h2>{editingId ? "Edit Task" : "Create New Task"}</h2>
          <form onSubmit={handleCreateOrUpdate}>
            <div className="form-group">
              <label htmlFor="title">Task Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Enter task description"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {editingId ? "Update Task" : "Create Task"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="tasks-list-section">
          <h2>{user?.role === "admin" ? "All Tasks (Admin View)" : "Your Tasks"}</h2>
          {tasks.length === 0 ? (
            <p className="no-tasks">No tasks yet. Create one to get started!</p>
          ) : (
            <div className="tasks-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    {user?.role === "admin" && <th>Created By</th>}
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description || "-"}</td>
                      {user?.role === "admin" && (
                        <td>
                          {task.createdBy?.name || "Unknown"}
                          <br />
                          <small>{task.createdBy?.email || ""}</small>
                        </td>
                      )}
                      <td>
                        <span className={`status status-${task.status}`}>
                          {task.status === "todo" && "To Do"}
                          {task.status === "in-progress" && "In Progress"}
                          {task.status === "done" && "Done"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
