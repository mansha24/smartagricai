"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "@/components/NavBar";

export default function YieldPage() {
  const [yieldData, setYieldData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYieldData();
  }, []);

  const fetchYieldData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/yield`, config);
      setYieldData(response.data);
    } catch (error) {
      console.error('Error fetching yield data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 text-slate-100">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Yield Management</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-slate-400">Yield data will appear here once available.</p>
        </div>
      </div>
    </div>
  );
}