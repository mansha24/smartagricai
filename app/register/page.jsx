"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getClientApiBaseUrl } from "@/lib/client-api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = getClientApiBaseUrl();
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Could not create your account.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      setError("Unable to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-800/90 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Create Account</p>
          <h1 className="text-4xl font-semibold text-white">Join SmartAgriAI</h1>
          <p className="max-w-2xl text-slate-400">Start managing your farm operations with smart agriculture tools.</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-900/20 p-4 text-red-200">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Full Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="John Doe"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="farm@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="••••••••"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-300">Role</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
