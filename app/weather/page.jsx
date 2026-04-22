"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "@/components/NavBar";
import { getClientApiBaseUrl } from "@/lib/client-api";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const apiUrl = getClientApiBaseUrl();
      const response = await axios.get(`${apiUrl}/weather`, config);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 text-slate-100">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Weather Information</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-slate-400">Weather data will appear here once available.</p>
        </div>
      </div>
    </div>
  );
}