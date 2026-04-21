import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold">Smart Agri AI</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="hover:text-green-200">Dashboard</Link>
                <Link to="/crops" className="hover:text-green-200">Crops</Link>
                <Link to="/soil" className="hover:text-green-200">Soil</Link>
                <Link to="/irrigation" className="hover:text-green-200">Irrigation</Link>
                <Link to="/weather" className="hover:text-green-200">Weather</Link>
                <Link to="/equipment" className="hover:text-green-200">Equipment</Link>
                <Link to="/fertilizer" className="hover:text-green-200">Fertilizer</Link>
                <Link to="/yield" className="hover:text-green-200">Yield</Link>
                <Link to="/recommendations" className="hover:text-green-200">Recommendations</Link>
                <Link to="/suppliers" className="hover:text-green-200">Suppliers</Link>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-green-200">Login</Link>
              <Link to="/register" className="hover:text-green-200">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
