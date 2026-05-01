# Task Manager Application - Full Stack Assignment

## Project Overview

This is a full-stack Task Manager application built with the following technologies:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: React.js with Vite and React Router
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **Validation**: express-validator for input validation
- **Security**: CORS, Rate limiting, Password hashing

The application allows users to register, login, create, read, update, and delete tasks. Admin users can view all tasks in the system.

## Project Structure

```
root/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── roleMiddleware.js     # Role-based access control
│   ├── models/
│   │   ├── User.js               # User schema and model
│   │   └── Task.js               # Task schema and model
│   ├── routes/
│   │   └── v1/
│   │       ├── authRoutes.js     # Authentication endpoints
│   │       └── taskRoutes.js     # Task endpoints
│   ├── server.js                 # Express server setup
│   ├── .env                      # Environment variables
│   └── package.json              # Dependencies and scripts
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Axios instance with interceptors
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx    # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Dashboard.jsx     # Main task dashboard
│   │   ├── styles/
│   │   │   ├── index.css         # Global styles
│   │   │   ├── Auth.css          # Authentication pages styles
│   │   │   └── Dashboard.css     # Dashboard styles
│   │   ├── App.jsx               # Main App component with routing
│   │   ├── main.jsx              # React entry point
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── .env                      # Environment variables
│   └── package.json              # Dependencies and scripts
└── README.md                      # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Backend Setup

1. **Navigate to the Backend directory**

   ```bash
   cd Backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the Backend folder with:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/primetrade?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CLIENT_URL=http://localhost:5173
   ```

   **Note**: Replace `your_username`, `your_password`, and `your_cluster` with your actual MongoDB Atlas credentials.

4. **Start the backend server**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to the Frontend directory (in a new terminal)**

   ```bash
   cd Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the Frontend folder with:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## API Endpoints

All responses follow a consistent JSON format:

```json
{
  "success": true/false,
  "message": "...",
  "data": {...} or null
}
```

### Authentication Endpoints

#### Register User

- **Method**: `POST`
- **Path**: `/api/v1/auth/register`
- **Auth Required**: No
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "token": "jwt_token"
    }
  }
  ```

#### Login User

- **Method**: `POST`
- **Path**: `/api/v1/auth/login`
- **Auth Required**: No
- **Description**: Login with email and password
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "token": "jwt_token"
    }
  }
  ```

### Task Endpoints

**All task endpoints require authentication. Include the JWT token in the Authorization header:**

```
Authorization: Bearer your_jwt_token
```

#### Get User Tasks

- **Method**: `GET`
- **Path**: `/api/v1/tasks`
- **Auth Required**: Yes
- **Description**: Get all tasks created by the logged-in user
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "todo",
        "createdBy": {
          "_id": "user_id",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

#### Create Task

- **Method**: `POST`
- **Path**: `/api/v1/tasks`
- **Auth Required**: Yes
- **Description**: Create a new task
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "status": "todo"
  }
  ```
- **Success Response**: Same as single task object in Get User Tasks

#### Update Task

- **Method**: `PUT`
- **Path**: `/api/v1/tasks/:id`
- **Auth Required**: Yes
- **Description**: Update a task (only owner or admin can update)
- **Request Body**:
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description",
    "status": "in-progress"
  }
  ```
- **Success Response**: Updated task object

#### Delete Task

- **Method**: `DELETE`
- **Path**: `/api/v1/tasks/:id`
- **Auth Required**: Yes
- **Description**: Delete a task (only owner or admin can delete)
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": null
  }
  ```

#### Get All Tasks (Admin Only)

- **Method**: `GET`
- **Path**: `/api/v1/admin/tasks`
- **Auth Required**: Yes (Admin role required)
- **Description**: Get all tasks from all users (admin only)
- **Success Response**: Array of all tasks

#### Health Check

- **Method**: `GET`
- **Path**: `/api/health`
- **Auth Required**: No
- **Description**: Check if the server is running
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Server is running",
    "data": null
  }
  ```

## User Roles

- **User**: Default role, can create, view, update, and delete their own tasks
- **Admin**: Can view all tasks and perform admin operations

## Features

### Frontend Features

1. **Authentication**
   - User registration with email validation
   - User login with JWT token storage
   - Persistent authentication using localStorage

2. **Task Management**
   - View all user tasks
   - Create new tasks
   - Edit existing tasks
   - Delete tasks
   - Change task status (To Do, In Progress, Done)

3. **User Interface**
   - Clean and responsive design
   - Real-time form validation
   - Success and error message notifications
   - Protected routes for authenticated pages

### Backend Features

1. **Authentication & Security**
   - JWT token generation and verification
   - Bcrypt password hashing
   - Role-based access control
   - CORS enabled for frontend
   - Rate limiting (100 requests per 15 minutes)

2. **Task Management**
   - Full CRUD operations
   - User-specific task isolation
   - Admin task viewing
   - Timestamps for all tasks

3. **Error Handling**
   - Global error handler middleware
   - Comprehensive error messages
   - Input validation on all endpoints

## Scalability Considerations

### Horizontal Scaling

1. **Load Balancing**
   - Deploy multiple instances of the backend server behind a load balancer (e.g., nginx, HAProxy)
   - Use round-robin or least-connections distribution algorithms
   - Implement sticky sessions if needed for stateful operations

2. **Database Optimization**
   - **MongoDB Indexing**: Create indexes on frequently queried fields:
     - `User.email` (unique index)
     - `Task.createdBy` (for faster user task queries)
     - `Task.status` (for filtering by status)
     - `Task.createdAt` (for sorting by creation date)
   - Consider MongoDB sharding for large datasets

3. **Caching Layer**
   - Implement Redis for session caching to reduce database queries
   - Cache frequently accessed tasks
   - Store JWT token blacklist in Redis for logout functionality
   - Example: Cache user tasks with a TTL to reduce database load

4. **API Rate Limiting**
   - Currently set to 100 requests per 15 minutes per IP
   - Can be distributed using Redis for multi-server setups
   - Implement per-user rate limiting for authenticated endpoints

5. **Microservices Architecture**
   - **Split into separate services**:
     - Authentication Service: Handle user registration, login, token management
     - Task Service: Handle task CRUD operations
     - Admin Service: Handle admin operations
   - Use message queues (RabbitMQ, Kafka) for inter-service communication
   - Implement service discovery (Consul, Eureka) for dynamic service location

6. **Frontend Optimization**
   - Use Content Delivery Network (CDN) for static assets
   - Implement code splitting and lazy loading
   - Optimize bundle size
   - Use service workers for offline capabilities

7. **Monitoring & Logging**
   - Implement centralized logging (ELK Stack, Splunk)
   - Monitor server performance and resource usage
   - Set up alerts for anomalies
   - Track API response times and error rates

8. **CI/CD Pipeline**
   - Automated testing and deployment
   - Blue-green deployments for zero-downtime updates
   - Automated rollback on failures

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files to version control
2. **JWT Secret**: Use a strong, random JWT secret in production
3. **HTTPS**: Use HTTPS in production for secure data transmission
4. **Password Requirements**: Enforce strong password requirements
5. **Input Validation**: Always validate and sanitize user input
6. **Rate Limiting**: Protect against brute force attacks
7. **CORS**: Restrict CORS origins in production

## Development Notes

- The application uses JWT tokens with 7-day expiration
- Passwords are hashed using bcrypt with 10 salt rounds
- MongoDB connections include retry logic
- All timestamps use UTC format
- Task status can be: "todo", "in-progress", or "done"

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**: Check your MONGO_URI in the `.env` file and ensure MongoDB Atlas account has proper network access rules
2. **Port Already in Use**: Change the PORT in `.env` or kill the process using port 5000
3. **CORS Errors**: Ensure CLIENT_URL in backend `.env` matches your frontend URL

### Frontend Issues

1. **API Connection Failed**: Verify backend is running and VITE_API_BASE_URL is correct
2. **Token Issues**: Clear localStorage and re-login if experiencing authentication problems
3. **Blank Dashboard**: Check browser console for errors and verify API endpoints are accessible

## Future Enhancements

1. Add task categories and tags
2. Implement task due dates and reminders
3. Add task attachment functionality
4. Implement team collaboration features
5. Add email notifications
6. Create dashboard analytics
7. Implement pagination for large datasets
8. Add dark mode theme
9. Implement task search and filtering
10. Add task comments and activity logs

## License

ISC License

## Support

For issues or questions, please refer to the API documentation above or check the console logs for detailed error messages.
