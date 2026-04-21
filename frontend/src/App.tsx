import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Soil from './pages/Soil';
import Irrigation from './pages/Irrigation';
import Weather from './pages/Weather';
import Equipment from './pages/Equipment';
import Fertilizer from './pages/Fertilizer';
import Yield from './pages/Yield';
import Recommendations from './pages/Recommendations';
import Suppliers from './pages/Suppliers';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
          <Route path="/soil" element={<ProtectedRoute><Soil /></ProtectedRoute>} />
          <Route path="/irrigation" element={<ProtectedRoute><Irrigation /></ProtectedRoute>} />
          <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
          <Route path="/equipment" element={<ProtectedRoute><Equipment /></ProtectedRoute>} />
          <Route path="/fertilizer" element={<ProtectedRoute><Fertilizer /></ProtectedRoute>} />
          <Route path="/yield" element={<ProtectedRoute><Yield /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
