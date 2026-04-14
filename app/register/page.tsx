"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Could not create your account.");
      return;
    }

    localStorage.setItem("smartagri_token", "");
    localStorage.removeItem("smartagri_user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-800/90 bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Register</p>
          <h1 className="text-4xl font-semibold text-white">Create your farm account</h1>
          <p className="max-w-2xl text-slate-400">Start managing farm operations, sensor telemetry, and role-based controls in one place.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-300">Full name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400"
              placeholder="Amina Khan"
              required
            />
          </label>

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
              placeholder="Create a password"
              required
            />
          </label>

          <fieldset className="rounded-3xl border border-slate-700 bg-slate-950/90 p-4">
            <legend className="text-sm font-medium text-slate-300">Select your role</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { value: "farmer", label: "Farmer" },
                { value: "userfarmer", label: "UserFarmer" },
                { value: "admin", label: "Admin" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-3xl border px-4 py-3 transition ${role === option.value ? "border-emerald-400 bg-emerald-400/10" : "border-slate-700 bg-slate-950"}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={option.value}
                    checked={role === option.value}
                    onChange={() => setRole(option.value)}
                    className="h-4 w-4 accent-emerald-400"
                  />
                  <span className="text-sm font-medium text-slate-100">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error ? <p className="rounded-3xl bg-rose-500/15 px-4 py-3 text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-slate-400">
          Already have an account? <a href="/login" className="font-semibold text-emerald-300 hover:text-emerald-200">Sign in</a>.
        </p>
      </div>
    </main>
  );
}
