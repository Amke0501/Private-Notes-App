# Private Notes Application

A secure, full-stack web application for managing personal notes with user authentication and data privacy features.

## Project Overview

This application provides users with a private space to create, manage, and store personal notes. Built with modern web technologies, it demonstrates the implementation of secure authentication, database management, and responsive user interface design. The application ensures that each user's notes remain completely private and inaccessible to others through multiple layers of security.

## Technology Stack

### Frontend
- **React.js** - Component-based UI framework for building the user interface
- **React Router** - Client-side routing for navigation
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Vite** - Modern build tool for optimal development experience

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for building RESTful APIs
- **Cookie-Parser** - Middleware for handling HTTP cookies

### Database & Authentication
- **Supabase** - Backend-as-a-Service platform providing PostgreSQL database and authentication
- **JWT (JSON Web Tokens)** - Secure token-based authentication

## Key Features

### Security Implementation
- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies to prevent XSS attacks
- **Row Level Security (RLS)**: Database-level security policies ensuring users can only access their own data
- **Protected Routes**: Both client-side and server-side route protection
- **Password Hashing**: Secure password storage through Supabase authentication system

### Application Features
- User registration and authentication
- Create, read, update, and delete (CRUD) operations for notes
- Real-time data synchronization
- Responsive design for mobile and desktop devices
- Session management with secure logout functionality

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Supabase account (free tier available)

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amke0501/Private-Notes-App.git
   cd Private-Notes-App
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   
   Edit the `.env` file in the backend directory with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Database Configuration**
   
   Run the SQL script from `SUPABASE_SETUP.md` in your Supabase SQL Editor to create the necessary tables and security policies.

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the Application**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup` - Register a new user account
- `POST /api/auth/login` - Authenticate user and create session
- `POST /api/auth/logout` - Terminate user session
- `GET /api/auth/me` - Retrieve current user information

### Notes Endpoints (Protected)
- `GET /api/notes` - Retrieve all notes for authenticated user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note

## Project Architecture

```
Private-Notes-App/
├── backend/
│   ├── config/          # Supabase configuration
│   ├── middleware/      # Authentication middleware
│   ├── routes/          # API route handlers
│   └── server.js        # Express server setup
├── frontend/
│   ├── src/
│   │   ├── api/        # API service layer
│   │   ├── components/ # React components
│   │   ├── context/    # React context providers
│   │   └── pages/      # Page components
│   └── public/         # Static assets
└── docs/               # Documentation files
```

## Security Considerations

This application implements multiple layers of security:

1. **Authentication Layer**: JWT tokens stored in HTTP-only cookies prevent token theft via JavaScript
2. **API Layer**: Middleware validates authentication tokens on all protected endpoints
3. **Database Layer**: Row Level Security policies enforce data isolation at the database level
4. **Transport Layer**: CORS configuration restricts API access to authorized origins

## Learning Outcomes

This project demonstrates proficiency in:
- Full-stack web application development
- RESTful API design and implementation
- Modern authentication and authorization patterns
- Database design and security implementation
- Frontend state management
- Responsive web design principles

## Author

Developed as an educational project to demonstrate full-stack web development capabilities and modern security practices.

