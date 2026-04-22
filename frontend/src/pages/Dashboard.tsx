import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    crops: 0,
    soilTests: 0,
    equipment: 0,
    recommendations: 0,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(userData);

    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const token = userData?.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch crops count
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const cropsRes = await axios.get(`${apiUrl}/crops`, config);
        setStats(prev => ({ ...prev, crops: cropsRes.data.length }));

        // You can add more stats fetching here
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (userData) {
      fetchStats();
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Crops</h3>
          <p className="text-3xl font-bold text-green-600">{stats.crops}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Soil Tests</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.soilTests}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Equipment</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.equipment}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recommendations</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.recommendations}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome to Smart Agriculture Management</h2>
        <p className="text-gray-600 mb-4">
          Manage your crops, monitor soil health, track irrigation, and get smart recommendations for better farming.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Quick Actions</h3>
            <ul className="space-y-2">
              <li><a href="/crops" className="text-green-600 hover:text-green-700">Manage Crops</a></li>
              <li><a href="/soil" className="text-green-600 hover:text-green-700">Check Soil Health</a></li>
              <li><a href="/irrigation" className="text-green-600 hover:text-green-700">Irrigation Schedule</a></li>
              <li><a href="/recommendations" className="text-green-600 hover:text-green-700">View Recommendations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Weather & Alerts</h3>
            <p className="text-gray-600">Check current weather conditions and get alerts for your crops.</p>
            <a href="/weather" className="text-green-600 hover:text-green-700">View Weather</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
