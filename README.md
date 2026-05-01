# TaskFlow API 📋

A full-stack web application with secure REST APIs, JWT authentication, and role-based access control (RBAC). Built as a Backend Developer Intern assignment.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Supported-green)
![Express](https://img.shields.io/badge/Express-v4+-blue)
![React](https://img.shields.io/badge/React-v18+-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-ISC-blue)

## ✨ Features

- 🔐 User registration and login with bcrypt password hashing
- 🔑 JWT-based authentication with 7-day token expiry
- 👥 Role-based access control (User vs Admin roles)
- ✅ Full CRUD operations for tasks (Create, Read, Update, Delete)
- 📍 API versioning (/api/v1/)
- ✔️ Input validation using express-validator
- 🛡️ Protected frontend routes with token verification
- 👨‍💼 Admin-only endpoint to view all tasks from all users
- 🚫 Rate limiting (100 requests per 15 minutes)
- 📊 CORS enabled for cross-origin requests
- ⚡ Real-time error handling and validation messages

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v18+
- **Framework:** Express.js v4
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken) + bcrypt
- **Validation:** express-validator
- **Security:** CORS, Rate Limiting, Helmet ready
- **Environment:** dotenv

### Frontend
- **Framework:** React.js v18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios with interceptors
- **Styling:** Modern CSS3

## 📁 Project Structure

```
taskflow-api/
├── Backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Register & Login logic
│   │   └── taskController.js        # Task CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── roleMiddleware.js        # Admin role check
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, role)
│   │   └── Task.js                  # Task schema (title, description, status, createdBy)
│   ├── routes/
│   │   └── v1/
│   │       ├── authRoutes.js        # /api/v1/auth/*
│   │       └── taskRoutes.js        # /api/v1/tasks/*
│   ├── scripts/
│   │   └── seedAdmin.js             # Create admin user script
│   ├── server.js                    # Express app setup
│   ├── .env                         # Environment variables (create this)
│   ├── .gitignore                   # Git ignore rules
│   └── package.json                 # Dependencies
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js             # Axios instance with JWT interceptor
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx   # Route protection component
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login form
│   │   │   ├── Register.jsx         # Registration form
│   │   │   └── Dashboard.jsx        # Task management dashboard
│   │   ├── styles/
│   │   │   ├── index.css            # Global styles
│   │   │   ├── Auth.css             # Auth pages styles
│   │   │   └── Dashboard.css        # Dashboard styles
│   │   ├── App.jsx                  # Router setup
│   │   ├── App.css                  # App styles
│   │   └── main.jsx                 # React entry point
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── .env                         # Environment variables (create this)
│   ├── .gitignore                   # Git ignore rules
│   └── package.json                 # Dependencies
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database) or local MongoDB instance

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskflow-api.git
cd taskflow-api
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/primetrade?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
CLIENT_URL=http://localhost:5173
```

**Important:** Replace these with your actual MongoDB credentials from MongoDB Atlas.

Start the backend server:

```bash
npm start
```

✅ Backend runs on `http://localhost:5000`

### 3. Create Admin User (Optional but Recommended)

In a new terminal (inside Backend folder):

```bash
npm run seed
```

This creates an admin account:
- **Email:** `admin@primetrade.com`
- **Password:** `admin123`

### 4. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

✅ Frontend runs on `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | ❌ | Register new user |
| POST | `/api/v1/auth/login` | ❌ | Login & get JWT token |

### Task Routes (Protected)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/tasks` | ✅ | Get user's tasks |
| POST | `/api/v1/tasks` | ✅ | Create new task |
| PUT | `/api/v1/tasks/:id` | ✅ | Update task (owner/admin) |
| DELETE | `/api/v1/tasks/:id` | ✅ | Delete task (owner/admin) |

### Admin Routes (Protected - Admin Only)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/tasks/admin/all` | ✅ Admin | Get ALL tasks (all users) |

### Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | ❌ | Check server status |

---

## 📝 API Response Format

All endpoints return responses in this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Task",
    "description": "Task description",
    "status": "todo",
    "createdBy": "507f1f77bcf86cd799439010",
    "createdAt": "2024-05-01T10:30:00Z",
    "updatedAt": "2024-05-01T10:30:00Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

---

## 👥 Role System

| Role | Default | Access |
|------|---------|--------|
| `user` | ✅ Auto-assigned on registration | Own tasks only |
| `admin` | ❌ Must be manually set | All tasks from all users |

### Make a User Admin

**Using Seed Script (Recommended):**
```bash
npm run seed
```

**Using MongoDB CLI:**
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

**Using MongoDB Atlas UI:**
1. Go to your MongoDB Atlas cluster
2. Click "Collections" → "Users" collection
3. Find the user and change `role` from `"user"` to `"admin"`

---

## 🔐 Authentication Flow

1. User registers with email & password
2. Password is hashed using bcrypt (10 salt rounds)
3. User logs in with email & password
4. Server verifies credentials and returns JWT token
5. Frontend stores token in localStorage
6. Token sent in `Authorization: Bearer {token}` header for protected routes
7. Token expires in 7 days (user must re-login)

---

## 📊 Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in-progress', 'done'], default: 'todo'),
  createdBy: ObjectId (ref: User, required),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 💡 Usage Examples

### Register a User

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response contains JWT token:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "507f1f77bcf86cd799439010",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Create a Task

```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "status": "todo"
  }'
```

---

## 🎯 Frontend Pages

### Login Page (`/login`)
- Email & password form
- Link to registration
- JWT token saved to localStorage on success

### Register Page (`/register`)
- Name, email, password form
- Input validation
- Redirects to login on success

### Dashboard Page (`/dashboard`) - Protected
- View all user's tasks (or all tasks if admin)
- Create new tasks
- Edit existing tasks
- Delete tasks
- Change task status (To Do → In Progress → Done)
- Logout button
- Real-time success/error messages

---

## 🔒 Security Features

✅ **Password Security:**
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared securely during login

✅ **JWT Security:**
- Tokens signed with secret key
- 7-day expiration
- Verified on every protected request

✅ **Input Validation:**
- Email format validation
- Password minimum 6 characters
- Title required for tasks
- express-validator for all inputs

✅ **Rate Limiting:**
- 100 requests per 15 minutes per IP
- Prevents brute force attacks
- Returns clear error messages

✅ **CORS Configuration:**
- Frontend origin only
- Prevents unauthorized cross-origin requests

✅ **Protected Routes:**
- Frontend checks for token before allowing access
- Backend verifies token on every request
- Automatic redirect to login if unauthorized

---

## 📈 Scalability & Performance

### Horizontal Scaling
```
Load Balancer (nginx/HAProxy)
        ↓
   ┌────┴────┐
   ↓         ↓
Server-1  Server-2  Server-3
   ↓         ↓         ↓
MongoDB Cluster (Sharded)
```

- **Stateless JWT Auth:** Multiple server instances work seamlessly
- **No Session Affinity:** Requests can go to any server

### Caching Strategy
- **Redis Cache:** Cache frequently queried tasks
- **Session Storage:** Redis for JWT blacklist on logout
- **Reduces DB load:** Decreases MongoDB queries by 70%+

### Database Optimization
- **Indexing:**
  ```javascript
  db.users.createIndex({ email: 1 }, { unique: true })
  db.tasks.createIndex({ createdBy: 1 })
  db.tasks.createIndex({ status: 1 })
  db.tasks.createIndex({ createdAt: -1 })
  ```
- **MongoDB Sharding:** Distribute data across multiple machines
- **Connection Pooling:** Optimize database connections

### Frontend Optimization
- **Code Splitting:** Lazy load components
- **CDN:** Serve static assets from CDN
- **Bundle Optimization:** Vite handles automatic code splitting
- **Caching Headers:** Browser caches assets for 1 year

### Microservices Architecture (Future)
```
Auth Service (Separate)
├── Register
├── Login
└── JWT Validation

Task Service (Separate)
├── CRUD Operations
└── Task Management

Admin Service (Separate)
└── View All Tasks

Message Queue (RabbitMQ/Kafka)
└── Inter-service Communication
```

### Deployment Options
- **Docker:** Containerize app for consistency
- **Cloud Platforms:**
  - **Heroku:** Simple deployment
  - **AWS:** EC2, ECS, Lambda
  - **Azure:** App Service, Container Instances
  - **Google Cloud:** Compute Engine, Cloud Run
- **CI/CD Pipeline:** GitHub Actions for automated testing & deployment
- **Load Balancing:** Distribute traffic across instances
- **Auto-scaling:** Scale up/down based on demand

---

## 🧪 Testing

### Manual Testing
1. Register a new user
2. Login with credentials
3. Create, update, delete tasks
4. Logout and verify redirect to login
5. Try accessing dashboard without token (should redirect)

### API Testing (Postman)
- Import all endpoints
- Set `Authorization` header with token
- Test CRUD operations
- Verify error responses

---

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID 1234 /F
```

**MongoDB Connection Error**
- Check MONGO_URI in `.env`
- Verify MongoDB Atlas credentials
- Ensure IP whitelist includes your computer
- Test connection: `mongo <MONGO_URI>`

**JWT Errors**
- Clear localStorage and re-login
- Verify JWT_SECRET is set in `.env`
- Check token expiry (7 days)

### Frontend Issues

**API Connection Failed**
- Ensure backend is running on port 5000
- Check VITE_API_BASE_URL in `.env`
- Open browser DevTools → Network → Check API calls

**MetaMask Extension Errors** (in console)
- Safe to ignore if not using Web3
- Related to browser extensions, not our app

**Blank Dashboard**
- Check browser console for errors
- Verify token is in localStorage
- Try logging in again

---

## 📜 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Ayushmaan Singh**  
Backend Developer Intern  
Created: May 2026

---

## 📞 Support & Questions

- 📧 Email your questions or issues
- 🐛 Report bugs in GitHub Issues
- 💬 Discussions available for questions

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ REST API design principles
- ✅ JWT authentication implementation
- ✅ Role-based access control (RBAC)
- ✅ Database modeling with MongoDB/Mongoose
- ✅ React frontend with protected routes
- ✅ Full-stack development workflow
- ✅ Security best practices
- ✅ Scalable architecture design

---

**Made with ❤️ as a Backend Developer Intern assignment**


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
