"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "@/components/NavBar";

export default function CropsPage() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/crops`, config);
      setCrops(response.data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading crops...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Crop Management</h1>
        
        <div className="bg-slate-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Crops</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Add New Crop
            </button>
          </div>

          {crops.length === 0 ? (
            <p className="text-slate-400">No crops found. Add your first crop to get started.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crops.map((crop) => (
                <div key={crop._id} className="border border-slate-700 rounded-lg p-4 bg-slate-900">
                  <h3 className="text-lg font-semibold mb-2">{crop.name}</h3>
                  <p className="text-slate-400 mb-1">Type: {crop.type}</p>
                  <p className="text-slate-400 mb-1">Status: {crop.status}</p>
                  <p className="text-slate-400 mb-1">Planted: {new Date(crop.plantingDate).toLocaleDateString()}</p>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                      View Details
                    </button>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}