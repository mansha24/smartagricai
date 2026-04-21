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

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create `.env` file in backend directory:
```
MONGO_URI=mongodb://localhost:27017/smartagricai
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

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
