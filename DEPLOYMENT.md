# Deployment Guide

## Architecture
The Smart Agriculture Management System uses a MERN stack with separate backend and frontend:
- **Backend**: Node.js + Express + MongoDB (RESTful API)
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: MongoDB (Atlas or self-hosted)

##Backend Deployment

### Option 1: Deploy on Railway (Recommended for beginners)

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select `/backend` as the root directory
4. Set environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string (minimum 32 characters)
   - `PORT`: 5000
5. Deploy

### Option 2: Deploy on Render

1. Create account at [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo and select `backend` branch
4. Build command: `npm install`
5. Start command: `npm start`
6. Set environment variables (same as above)
7. Deploy

### Option 3: Deploy on Heroku

1. Install Heroku CLI
2. Run:
   ```bash
   heroku login
   heroku create your-app-name
   cd backend
   git subtree push --prefix backend heroku main
   ```
3. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=<mongodb_url>
   heroku config:set JWT_SECRET=<secret>
   ```

## Frontend Deployment

### Deploy on Vercel (Automatic)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel automatically detects `vercel.json` configuration
5. Set build environment variable:
   - `REACT_APP_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)
6. Deploy

### Deploy on Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `cd frontend && npm run build`
4. Set publish directory: `frontend/build`
5. Add environment variable: `REACT_APP_API_URL=<your-backend-url>`
6. Deploy

## Database Setup

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/smartagricai?retryWrites=true&w=majority`
4. Use this as `MONGO_URI` in backend environment variables

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod
   ```
3. Use `MONGO_URI=mongodb://localhost:27017/smartagricai`

## Environment Variables Checklist

### Backend
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure random string (min 32 chars)
- [ ] `PORT` - Server port (default: 5000)

### Frontend
- [ ] `REACT_APP_API_URL` - Backend API endpoint (e.g., https://api.yourdomain.com)

## Testing Deployed Application

### Test Backend API
```bash
# Register
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test", "email":"test@example.com", "password":"password123", "role":"Farmer"}'

# Login
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", "password":"password123"}'
```

### Test Frontend
Visit your Vercel/Netlify URL and verify you can:
1. Register a new account
2. Login with credentials
3. Navigate to Dashboard
4. See navigation working

## Troubleshooting

### Backend won't start
- Check `MONGO_URI` is correct and MongoDB is accessible
- Ensure `JWT_SECRET` is set
- Check port isn't already in use

### Frontend shows API errors
- Verify `REACT_APP_API_URL` environment variable is set correctly
- Check backend CORS is enabled
- Ensure backend is running and accessible

### TypeScript errors during build
- Run `npm install` in frontend folder
- Clear `.next` or `build` folder
- Try `npm cache clean --force` and reinstall

## Production Considerations

1. **Database**: Use MongoDB Atlas for production reliability
2. **SSL/HTTPS**: Both Vercel and Railway provide automatic SSL
3. **CORS**: Backend includes CORS middleware, configure for production domains
4. **JWT Secret**: Use a strong, randomly generated secret
5. **Rate Limiting**: Consider adding rate limiting middleware on backend
6. **Monitoring**: Set up logs monitoring on your hosting platform
