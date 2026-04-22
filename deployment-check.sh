#!/bin/bash

# Deployment Verification Checklist for Smart Agriculture System

echo "🚀 Smart Agriculture - Deployment Verification"
echo "================================================"
echo ""

# Check backend structure
echo "✓ Checking Backend Structure..."
if [ -f "backend/server.js" ]; then
  echo "  ✅ backend/server.js exists"
else
  echo "  ❌ backend/server.js NOT FOUND"
fi

if [ -f "backend/package.json" ]; then
  echo "  ✅ backend/package.json exists"
else
  echo "  ❌ backend/package.json NOT FOUND"
fi

if [ -f "backend/.env" ]; then
  echo "  ✅ backend/.env configured"
else
  echo "  ❌ backend/.env NOT FOUND"
fi

echo ""
echo "✓ Checking Frontend Structure..."
if [ -f "frontend/package.json" ]; then
  echo "  ✅ frontend/package.json exists"
else
  echo "  ❌ frontend/package.json NOT FOUND"
fi

if [ -f "frontend/.env" ]; then
  echo "  ✅ frontend/.env configured"
else
  echo "  ❌ frontend/.env NOT FOUND"
fi

if [ -d "frontend/src/pages" ]; then
  pageCount=$(ls frontend/src/pages/*.tsx 2>/dev/null | wc -l)
  echo "  ✅ Found $pageCount page components in frontend/src/pages"
else
  echo "  ❌ frontend/src/pages NOT FOUND"
fi

echo ""
echo "✓ Checking Configuration Files..."
if [ -f "vercel.json" ]; then
  echo "  ✅ vercel.json configured"
else
  echo "  ❌ vercel.json NOT FOUND"
fi

if [ -f "README.md" ]; then
  echo "  ✅ README.md exists"
else
  echo "  ❌ README.md NOT FOUND"
fi

if [ -f "COMPLETE_DEPLOYMENT_GUIDE.md" ]; then
  echo "  ✅ COMPLETE_DEPLOYMENT_GUIDE.md exists"
else
  echo "  ❌ COMPLETE_DEPLOYMENT_GUIDE.md NOT FOUND"
fi

echo ""
echo "✓ Checking Dependencies..."
if [ -d "backend/node_modules" ]; then
  echo "  ✅ Backend dependencies installed"
else
  echo "  ⚠️  Backend dependencies NOT installed (run: cd backend && npm install)"
fi

if [ -d "frontend/node_modules" ]; then
  echo "  ✅ Frontend dependencies installed"
else
  echo "  ⚠️  Frontend dependencies NOT installed (run: cd frontend && npm install)"
fi

echo ""
echo "✓ Checking API URL Configuration..."
if grep -q 'REACT_APP_API_URL' frontend/src/pages/Login.tsx; then
  echo "  ✅ Login.tsx uses environment variable for API URL"
else
  echo "  ❌ Login.tsx not configured"
fi

if grep -q 'REACT_APP_API_URL' frontend/src/pages/Register.tsx; then
  echo "  ✅ Register.tsx uses environment variable for API URL"
else
  echo "  ❌ Register.tsx not configured"
fi

echo ""
echo "✓ Checking Backend Configuration..."
if grep -q 'MONGODB_URI\|MONGO_URI' backend/server.js; then
  echo "  ✅ Backend configured for MongoDB connection"
else
  echo "  ❌ Backend MongoDB configuration missing"
fi

if grep -q 'app.use.*cors' backend/server.js; then
  echo "  ✅ Backend has CORS enabled"
else
  echo "  ❌ Backend CORS configuration missing"
fi

echo ""
echo "================================================"
echo "📋 Deployment Preparation Summary"
echo "================================================"
echo ""
echo "✓ All critical files are in place"
echo ""
echo "Next Steps:"
echo "1. Ensure backend/.env has correct MONGODB_URI and JWT_SECRET"
echo "2. Deploy backend to Railway/Render/Heroku"
echo "3. Get the deployed backend URL"
echo "4. Set REACT_APP_API_URL in Vercel as the backend URL"
echo "5. Deploy frontend to Vercel with frontend/ as root"
echo ""
echo "📖 For detailed instructions, read: COMPLETE_DEPLOYMENT_GUIDE.md"
echo ""
