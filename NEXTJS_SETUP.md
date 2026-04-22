# SmartAgriAI - Smart Agriculture Management Platform

A comprehensive Next.js application for managing farm operations, crops, soil health, irrigation, and autonomous recommendations using MongoDB and modern web technologies.

## 🎯 Project Overview

SmartAgriAI is a complete farm management solution built with:
- **Frontend**: Next.js 16+ with React (Pure JavaScript)
- **Backend**: Node.js + Express running on port 5000
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: JWT-based with role support

## 📋 Features

- ✅ User Authentication (Login/Register with JWT)
- ✅ Role-Based Access Control (Farmer, Admin)
- ✅ Dashboard with Real-time Stats
- ✅ Crop Management
- ✅ Soil Health Monitoring
- ✅ Irrigation Management
- ✅ Weather Information
- ✅ Equipment Tracking
- ✅ Fertilizer Management
- ✅ Yield Tracking
- ✅ Smart Recommendations
- ✅ Supplier Management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB Atlas account (connection string ready)

### Environment Setup

Create/Update `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"
NEXT_PUBLIC_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority"

# Authentication
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=4h

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Installation & Running

#### Development Mode (Recommended)

```bash
# Install all dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev
```

#### Production Build

```bash
# Build the optimized production version
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
smartagricai/
├── app/                              # Next.js app directory (pages)
│   ├── api/                          # API Routes (Server-side)
│   │   ├── auth/
│   │   │   ├── login/route.js        # Login endpoint
│   │   │   ├── register/route.js     # Register endpoint
│   │   │   └── me/route.js           # Get current user
│   │   ├── public/                   # Public endpoints
│   │   └── users/route.js            # User management
│   │
│   ├── dashboard/page.jsx            # Main dashboard
│   ├── crops/page.jsx                # Crop management
│   ├── soil/page.jsx                 # Soil health
│   ├── irrigation/page.jsx           # Irrigation mgmt
│   ├── weather/page.jsx              # Weather data
│   ├── equipment/page.jsx            # Equipment tracking
│   ├── fertilizer/page.jsx           # Fertilizer mgmt
│   ├── yield/page.jsx                # Yield tracking
│   ├── recommendations/page.jsx      # AI recommendations
│   ├── suppliers/page.jsx            # Supplier mgmt
│   ├── farmers/page.jsx              # Farmers list
│   ├── admin/page.jsx                # Admin panel
│   ├── login/page.jsx                # Login page
│   ├── register/page.jsx             # Registration page
│   ├── layout.jsx                    # Root layout
│   └── page.jsx                      # Home page
│
├── components/                       # Reusable Components
│   └── NavBar.jsx                    # Navigation bar
│
├── lib/                              # Utility Libraries
│   ├── auth.js                       # JWT utility functions
│   ├── auth-context.jsx              # Auth context provider
│   ├── mongodb.js                    # MongoDB connection
│   └── types.ts                      # TypeScript types (optional)
│
├── backend/                          # Optional Backend (Express)
│   ├── server.js                     # Entry point
│   ├── models/                       # Mongoose schemas
│   ├── routes/                       # API routes
│   ├── controllers/                  # Request handlers
│   └── middleware/                   # Auth middleware
│
├── public/                           # Static assets
├── scripts/                          # Utility scripts
├── package.json                      # Dependencies
├── jsconfig.json                     # JavaScript config
├── .env.local                        # Environment (local)
└── .gitignore
```

## 🔐 Authentication System

### How It Works

1. **Registration** (`/register`)
   - User creates account with name, email, password, role
   - Password hashed with bcrypt
   - User stored in MongoDB
   - Automatic login with JWT token

2. **Login** (`/login`)
   - User provides email and password
   - Password verified against hash
   - JWT token generated
   - Token stored in localStorage
   - Redirect to dashboard

3. **Protected Routes**
   - Authorization header checked
   - JWT token verified
   - User data extracted from token
   - Access granted/denied based on role

### API Endpoints

```javascript
// Authentication Endpoints
POST   /api/auth/register          // Create new account
POST   /api/auth/login             // User login
GET    /api/auth/me                // Get current user (requires token)

// Usage Example
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@farm.com', password: '123456' })
});
```

## 📊 State Management

### Using Auth Context

```javascript
// In any component
import { useAuth } from '@/lib/auth-context';

export default function MyComponent() {
  const { user, token, loading, login, logout } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <p>Not logged in</p>;
  }
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Data Flow
```
localStorage (user + token) 
    ↓
AuthContext Provider
    ↓
useAuth() hook
    ↓
Components subscribe to changes
```

## 📡 API Integration Pattern

All components fetch data from backend using `NEXT_PUBLIC_API_URL`:

```javascript
// Example Fetch Pattern
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const token = localStorage.getItem('token');

const response = await fetch(`${apiUrl}/crops`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

## 🎨 Styling & Design System

### Color Palette
- **Primary**: Emerald-600 (#059669)
- **Secondary**: Slate-900-950 (dark background)
- **Text**: Slate-100 (light text)
- **Accent**: Emerald-400 (#34d399)

### Tailwind CSS
All styling uses Tailwind CSS utility classes. Example:

```jsx
<div className="min-h-screen bg-slate-950 text-slate-100">
  <h1 className="text-3xl font-bold mb-8">Title</h1>
  <button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg">
    Action
  </button>
</div>
```

## 📦 Dependencies

### Production Dependencies
```json
{
  "axios": "^1.4.0",           // HTTP client
  "bcryptjs": "^2.4.3",         // Password hashing
  "jsonwebtoken": "^9.0.2",     // JWT generation/verification
  "mongodb": "^7.1.1",          // MongoDB driver
  "next": "16.2.3",             // Next.js framework
  "react": "19.2.4",            // React library
  "react-dom": "19.2.4"         // React DOM
}
```

### Development Dependencies
```json
{
  "eslint": "^9",               // Linting
  "tailwindcss": "^4",          // CSS framework
  "dotenv": "^16.4.3"           // Environment variables
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Create optimized build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint

# Utilities
npm run seed-demo        # Seed demo data into database
```

## 🌐 Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel Project Settings:
   - MONGODB_URI
   - JWT_SECRET
   - JWT_EXPIRES_IN
   - NEXT_PUBLIC_API_URL (point to backend)
4. Deploy automatically on push to main

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t smartagricai .
docker run -p 3000:3000 --env-file .env.local smartagricai
```

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://prod-user:prod-pass@prod-cluster.mongodb.net/smartagri
JWT_SECRET=production-secret-key-min-32-chars-recommended
JWT_EXPIRES_IN=4h
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

**Issue**: MongoDB connection fails
- Verify URI in `.env.local`
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
- Ensure network connectivity

**Issue**: JWT authentication fails
- Clear browser localStorage: press F12 → Application → Clear
- Verify JWT_SECRET matches in .env.local
- Check token expiration time

**Issue**: Build fails with module not found
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Documentation](https://react.dev/reference/react)
- [MongoDB Documentation](https://docs.mongodb.com)
- [JWT Authentication](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com)

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Use strong JWT_SECRET** - Minimum 32 characters
3. **Hash passwords** - Always use bcrypt
4. **Validate inputs** - Server-side validation required
5. **HTTPS only** - Use SSL certificates in production
6. **CORS configuration** - Restrict allowed origins
7. **Rate limiting** - Prevent brute force attacks

## 📄 File Examples

### Login Component Example
```jsx
"use client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    // Handle response...
  };
  
  return (
    <form onSubmit={handleLogin}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

## ✅ Testing Checklist

- [ ] User can register with email and password
- [ ] User can login with credentials
- [ ] JWT token stored in localStorage
- [ ] Dashboard loads after login
- [ ] Navigation between pages works
- [ ] Logout clears token
- [ ] Protected routes redirect to login when not authenticated
- [ ] Build succeeds without errors
- [ ] Dev server starts on port 3000

## 📞 Support & Contributing

### Issues & Bugs
Please open an issue on GitHub with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable

### Contributing
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing`
5. Open Pull Request

## 📄 License

MIT License - Free to use and modify

## 👥 Authors

- Development Team
- Contributors Welcome!

---

**Last Updated**: April 2026
**Version**: 2.0 (Pure JavaScript, Next.js)
**Status**: Production Ready ✅