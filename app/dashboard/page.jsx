"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(userData);
    setLoading(false);
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
    </div>
  );
}
