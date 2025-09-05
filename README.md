# Web Developer Assignment

A full-stack application built with Node.js/TypeScript backend and React/TypeScript frontend, featuring user management, post management, and a responsive UI following the provided Figma design.

## 📋 Project Overview

This project implements a complete user and post management system with the following features:

### Backend Features ✅
- **User Management**: Extended user endpoints to include adders (metadata)
- **Post Management**: Full CRUD operations for posts
- **Post Deletion**: Delete posts by ID with proper validation
- **Add New Post**: Create new posts with title, body, and user ID
- **Error Handling**: Robust error handling with appropriate HTTP status codes
- **Data Validation**: Input validation and sanitization

### Frontend Features ✅
- **Users Table**: Paginated users display (4 users per page)
- **User Details**: Full name, email, and formatted address display
- **User Posts Page**: Individual user post management
- **Post Operations**: Add, view, and delete posts
- **Responsive Design**: Mobile-friendly UI following Figma specifications
- **Loading States**: Proper loading and error states throughout the app
- **React Query Integration**: Efficient state management and caching

## 🛠 Technology Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** for RESTful API
- **SQLite** database (data.db)
- **Input validation** and **error handling**

### Frontend
- **React 18** with **TypeScript**
- **React Query** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Jest** and **React Testing Library** for testing

## 📂 Project Structure

```
web-developer-assignment/
│
├── backend/                 # Node.js + TypeScript server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Data models
│   │   └── utils/          # Helper functions
│   ├── data.db            # SQLite database
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React + TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── __tests__/      # Unit tests
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd web-developer-assignment
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend server will start on `http://localhost:3001`

2. **Start the Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   The frontend application will start on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 🧪 Testing

### Running Unit Tests
```bash
cd frontend
npm test
```

The test suite includes:
- Component rendering tests
- User interaction tests
- API integration tests
- Error handling tests

### Test Coverage
- Critical components are tested
- API error scenarios covered
- User interaction flows validated

## 🎯 API Endpoints

### User Endpoints
- `GET /users` - Get paginated list of users
- `GET /users/count` - Get total user count
- `GET /users/:id` - Get user with adders (extended functionality)

### Post Endpoints
- `GET /posts?userId={userId}` - Get posts by user ID
- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete a post by ID

## ✨ Key Features Implemented

### 1. User Management
- ✅ Paginated users table (4 users per page)
- ✅ User details with formatted address (392px width with ellipsis)
- ✅ Extended user endpoints to include adders metadata
- ✅ Proper validation and formatting of adders data

### 2. Post Management
- ✅ User-specific post listing
- ✅ Post creation with title and body validation
- ✅ Post deletion with confirmation
- ✅ Real-time UI updates without page refresh

### 3. UI/UX Features
- ✅ Responsive design following Figma specifications
- ✅ Loading states for all async operations
- ✅ Error handling with user-friendly messages
- ✅ Intuitive navigation and user interactions

### 4. Technical Excellence
- ✅ React Query for efficient state management
- ✅ TypeScript for type safety
- ✅ Reusable components and custom hooks
- ✅ Performance optimization with memoization
- ✅ Comprehensive error handling

## 🎨 Design Implementation

The UI closely follows the provided Figma design with:
- Consistent color scheme and typography
- Proper spacing and layout
- Responsive breakpoints
- Interactive elements with hover states
- Loading spinners and error states

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Performance Optimizations

- React Query caching for efficient data fetching
- Component memoization to prevent unnecessary re-renders
- Lazy loading for better initial load times
- Optimized list rendering for large datasets
- Debounced search and form inputs

## 🛡 Error Handling

- Backend: Try-catch blocks with proper HTTP status codes
- Frontend: React Query error boundaries and user-friendly error messages
- Input validation on both client and server sides
- Graceful handling of network failures

## 📝 Development Notes

### Code Quality
- Consistent TypeScript usage throughout
- ESLint and Prettier configuration
- Modular component architecture
- Separation of concerns between UI and business logic

### State Management
- React Query for server state
- React hooks for local component state
- Efficient data synchronization between frontend and backend

## 🎯 Assignment Completion Status

| Requirement | Status | Notes |
|-------------|---------|-------|
| Backend - Adders to User | ✅ Complete | Extended user endpoints with adders metadata |
| Backend - Post Deletion | ✅ Complete | DELETE endpoint with proper validation |
| Backend - Add New Post | ✅ Complete | POST endpoint with input validation |
| Frontend - Users Table | ✅ Complete | Paginated table with 4 users per page |
| Frontend - User Posts Page | ✅ Complete | Post management with add/delete functionality |
| React Query Integration | ✅ Complete | Efficient state management and caching |
| Responsive Design | ✅ Complete | Mobile-friendly following Figma design |
| Unit Testing | ✅ Complete | Critical components tested |
| Error Handling | ✅ Complete | Robust error handling throughout |
| Code Reusability | ✅ Complete | Modular components and custom hooks |

## 📞 Support

If you encounter any issues while running the application:

1. Ensure Node.js version is 16 or higher
2. Check that both backend and frontend servers are running
3. Verify the SQLite database (data.db) exists in the backend directory
4. Clear browser cache if experiencing frontend issues

## 🚀 Production Deployment

For production deployment:
1. Build the frontend: `npm run build` in the frontend directory
2. Set environment variables for production
3. Configure proper CORS settings
4. Set up proper database backup and migration strategies

---

**Note**: This application successfully implements all requirements from the original assignment specification, including extended backend functionality, comprehensive frontend features, and robust testing coverage.