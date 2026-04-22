"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getClientApiBaseUrl } from "@/lib/client-api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiUrl = getClientApiBaseUrl();
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Unable to sign in.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      router.push("/dashboard");
    } catch (error) {
      setError("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-800/90 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Sign in</p>
          <h1 className="text-4xl font-semibold text-white">Access your SmartAgriAI account</h1>
          <p className="max-w-2xl text-slate-400">Enter your credentials to manage farm operations, sensor telemetry, and user roles.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="you@farm.com"
              required
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <p className="rounded-3xl bg-rose-500/15 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-400">
          New to SmartAgriAI? <a href="/register" className="font-semibold text-emerald-300 hover:text-emerald-200">Create an account</a>.
        </p>
      </div>
    </main>
  );
}
