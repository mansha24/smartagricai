# Smart Agriculture Management System

A comprehensive MERN stack application for smart agriculture management with role-based authentication and AI-powered recommendations.

## Features

- **Complete CRUD Operations**: Full create, read, update, delete functionality for all modules
- **Role-Based Authentication**: JWT-based auth with roles (Admin, Farmer, Agricultural Expert, Supplier)
- **MVC Architecture**: Clean backend structure with Models, Views, Controllers
- **Responsive UI**: Modern React interface with Tailwind CSS
- **Smart Features**: AI-powered crop recommendations, irrigation reminders, fertilizer suggestions

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Frontend**: React.js, TypeScript, Tailwind CSS, Axios, React Router
- **Database**: MongoDB with Mongoose ODM

## Project Structure

```
smartagricai/
├── backend/
│   ├── models/          # Database models
│   ├── controllers/     # Business logic
│   ├── routes/         # API routes
│   ├── middleware/     # Authentication & authorization
│   ├── config/         # Configuration files
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   └── App.tsx     # Main app component
│   └── public/         # Static assets
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Local Development Setup

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:5000`

#### Frontend Setup
In a separate terminal:
```bash
cd frontend
npm install
npm start
```
The frontend development server will run on `http://localhost:3000`

### Environment Variables

#### Backend (.env in `/backend/`)
```
MONGO_URI=mongodb://localhost:27017/smartagricai
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
PORT=5000
```

#### Frontend (.env in `/frontend/`)
```
REACT_APP_API_URL=http://localhost:5000
```

### Deployment

#### Deploy Backend (Node.js + Express)
- Deploy the `/backend` folder to Heroku, Railway, Render, or any Node.js hosting
- Set environment variables (MONGO_URI, JWT_SECRET)
- Backend will serve on the provided URL

#### Deploy Next.js App on Vercel
- Import the repository in Vercel and keep the root directory as `/`.
- Build command: `npm run build` (default for Next.js).
- Set these environment variables in Vercel project settings:
  - `MONGODB_URI`
  - `JWT_SECRET` (required in all environments, no default fallback)
  - `JWT_EXPIRES_IN` (optional, defaults to `4h`)
  - `NEXT_PUBLIC_API_URL` (required in production, for example: `https://your-project.vercel.app/api`)
- Redeploy after setting environment variables.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Crops Management
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Create new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Other Modules
- Soil Management: `/api/soil`
- Irrigation: `/api/irrigation`
- Weather: `/api/weather`
- Equipment: `/api/equipment`
- Fertilizer: `/api/fertilizer`
- Yield Analytics: `/api/yield`
- Recommendations: `/api/recommendations`
- Suppliers: `/api/suppliers`

## User Roles

1. **Admin**: Full system access, user management
2. **Farmer**: Crop management, soil testing, equipment tracking
3. **Agricultural Expert**: Provide recommendations, expert advice
4. **Supplier**: Manage products, marketplace listings

## Smart Features

- Crop recommendation system based on soil data
- Irrigation scheduling with weather integration
- Fertilizer recommendations based on soil tests
- Yield prediction and analytics
- Weather-based alerts and notifications

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.
