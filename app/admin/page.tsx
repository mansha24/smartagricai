"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function AdminPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [users, setUsers] = useState<Array<{ id: string; name: string; email: string; role: string; createdAt: string }>>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("smartagri_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        setUser(data.user);
      })
      .catch(() => {
        setError("Unable to load profile.");
      });

    fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Unable to load users.");
          return;
        }
        setUsers(data.users || []);
      })
      .catch(() => {
        setError("Unable to load users.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">Loading admin data…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar user={user} />
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="rounded-[32px] border border-slate-800/90 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Admin console</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">User management</h1>
              <p className="max-w-2xl text-slate-400">A role-based view of registered accounts and farm access levels.</p>
            </div>
          </div>

          {error ? <p className="mt-6 rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p> : null}

          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/90">
            <table className="w-full border-collapse text-left text-sm text-slate-200">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((person) => (
                  <tr key={person.id} className="border-t border-slate-800/80 hover:bg-slate-900/80">
                    <td className="px-6 py-4">{person.name}</td>
                    <td className="px-6 py-4">{person.email}</td>
                    <td className="px-6 py-4 capitalize text-emerald-300">{person.role}</td>
                    <td className="px-6 py-4 text-slate-400">{new Date(person.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
