# Complete Deployment Guide - Smart Agriculture Management System

## Architecture Overview

The Smart Agriculture Management System is a MERN stack application where:
- **Frontend** (React) → Deploys to Vercel
- **Backend** (Node.js + Express) → Deploys separately (Railway, Render, or Heroku)
- **Database** (MongoDB) → MongoDB Atlas (Cloud)

## Quick Start Deployment

### Step 1: Deploy Backend First

#### Option A: Deploy to Railway (Recommended)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Create a new project
3. Select "Deploy from GitHub repo" and select `smartagricai`
4. In settings, set root directory to `/backend`
5. Add environment variables:
   - `MONGODB_URI`: `mongodb+srv://Vercel-Admin-atlas-champagne-lighthouse:tzMzGF2IIwb3dyXp@atlas-champagne-lightho.q8ubqed.mongodb.net/?retryWrites=true&w=majority`
   - `JWT_SECRET`: `pC8gQ4sV0rF2dB7wZm1hK3xL6jN9qY5u`
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
6. Deploy and note the URL (e.g., `https://your-backend.railway.app`)

#### Option B: Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Create new Web Service
3. Connect GitHub repository
4. Select `/backend` as root directory
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables (same as above)
8. Deploy

#### Option C: Deploy to Heroku

```bash
# Install Heroku CLI
# Then run:
cd backend
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
git subtree push --prefix backend heroku main
```

### Step 2: Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New..." → "Project"
4. Import the `smartagricai` repository
5. Set project settings:
   - Framework: React
   - Root directory: `./frontend`
   - Build command: `npm run build`
   - Output directory: `build`
6. Set environment variables:
   - `REACT_APP_API_URL`: `https://your-backend.railway.app/api` (use your deployed backend URL)
7. Click Deploy

### Step 3: Configure Environment Variables

**Backend Environment (.env):**
```
MONGODB_URI=mongodb+srv://Vercel-Admin-atlas-champagne-lighthouse:tzMzGF2IIwb3dyXp@atlas-champagne-lightho.q8ubqed.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=pC8gQ4sV0rF2dB7wZm1hK3xL6jN9qY5u
PORT=5000
NODE_ENV=production
```

**Frontend Environment (.env):**
```
REACT_APP_API_URL=/api  (local development)
# Or for production:
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Project Structure for Deployment

```
smartagricai/
├── backend/                  # Node.js API Server
│   ├── server.js            # Main entry point
│   ├── package.json         # Backend dependencies
│   ├── .env                 # Backend configuration
│   ├── models/              # Database models
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   └── middleware/          # Auth middleware
│
├── frontend/                # React Application
│   ├── package.json         # Frontend dependencies
│   ├── .env                 # Frontend configuration
│   ├── public/              # Static files
│   ├── src/
│   │   ├── App.tsx          # Main component
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   └── index.tsx        # Entry point
│   └── tsconfig.json        # TypeScript config
│
├── vercel.json              # Vercel build configuration
├── package.json             # Root package.json
└── README.md                # Project documentation
```

## Verify Deployment

### Test Backend API

```bash
# Register
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Farmer",
    "email":"test@example.com",
    "password":"Test@123456",
    "role":"Farmer"
  }'

# Login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test@123456"
  }'

# Get all crops (requires valid token)
curl -X GET https://your-backend-url/api/crops \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Test Frontend

1. Visit your Vercel deploy URL
2. Try to register a new account
3. Login with your credentials
4. Navigate through all pages
5. Check browser console for any errors

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Crops
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Create new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Other Endpoints
- Soil: `/api/soil`
- Irrigation: `/api/irrigation`
- Weather: `/api/weather`
- Equipment: `/api/equipment`
- Fertilizer: `/api/fertilizer`
- Yield: `/api/yield`
- Recommendations: `/api/recommendations`
- Suppliers: `/api/suppliers`

## Troubleshooting

### Backend won't start
- ✅ Verify `MONGODB_URI` is correct and database is accessible
- ✅ Check `JWT_SECRET` is set
- ✅ Ensure `PORT` is set to 5000
- ✅ Restart deployment after changing environment variables

### Frontend shows "Cannot GET" errors
- ✅ Check `REACT_APP_API_URL` environment variable is set correctly
- ✅ Verify backend is running and accessible
- ✅ Check CORS is enabled in backend (it is by default)

### CORS errors in browser console
- ✅ The backend has CORS enabled for all origins in development
- ✅ For production, update CORS settings in `backend/server.js`

### TypeScript compilation errors
- ✅ Run `cd frontend && npm install` to ensure all dependencies are installed
- ✅ Check `frontend/tsconfig.json` is properly configured
- ✅ All page files should be in `frontend/src/pages/`

## Local Development

### Run locally before deploying

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

Access: `http://localhost:3000`

## Database

**MongoDB Atlas (Cloud Database):**
- Already configured in `.env` files
- Connection string is pre-configured with proper credentials
- Database: `smartagricai`

**Collections Created:**
- users
- crops
- soils
- equipment
- weather
- fertilizers
- yields
- recommendations
- suppliers
- irrigations

## Next Steps After Deployment

1. ✅ Test all authentication flows
2. ✅ Add sample data through API or frontend
3. ✅ Test CRUD operations for each module
4. ✅ Monitor application logs on hosting platforms
5. ✅ Set up error monitoring (Sentry, etc.)
6. ✅ Configure backups for MongoDB
7. ✅ Enable HTTPS (automatically done on Vercel/Railway/Render)

## Production Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] MongoDB connection verified
- [ ] REACT_APP_API_URL set correctly in frontend
- [ ] All environment variables configured
- [ ] CORS settings reviewed (if needed for production)
- [ ] Error logging set up
- [ ] Database backups configured
- [ ] Application tested end-to-end
- [ ] Domain configured (if applicable)

## Support & Further Configuration

For questions or issues:
1. Check the application logs on your hosting platform
2. Verify all environment variables are set
3. Test API endpoints using curl or Postman
4. Check browser console for frontend errors
5. Review server logs for backend errors
