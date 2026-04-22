"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

const farmers = [
  { name: "Amina Khan", role: "Lead Farmer", fields: 4, activity: "Field inspection" },
  { name: "Mateo Silva", role: "Greenhouse Manager", fields: 2, activity: "Irrigation setup" },
  { name: "Jade Lee", role: "Crop Specialist", fields: 3, activity: "Nutrient planning" },
];

export default function FarmersPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("smartagri_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          return;
        }
        setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">Loading farmers…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar user={user} />
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="rounded-[32px] border border-slate-800/90 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Farmer operations</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Team and field coordinators</h1>
            </div>
            <p className="text-sm text-slate-400">Review active team members and current assignments.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {farmers.map((person) => (
              <div key={person.name} className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-sm shadow-slate-950/10">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{person.role}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{person.name}</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p>{person.fields} managed fields</p>
                  <p>Current task: {person.activity}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                  <span>Best practice score</span>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">95%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
