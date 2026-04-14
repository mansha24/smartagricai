"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

const sampleFields = [
  { name: "Greenhouse 1", crop: "Tomatoes", moisture: "42%", status: "Optimal" },
  { name: "Orchard B", crop: "Apples", moisture: "38%", status: "Watch" },
  { name: "Field 12", crop: "Corn", moisture: "47%", status: "Good" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          localStorage.removeItem("smartagri_token");
          localStorage.removeItem("smartagri_user");
          router.push("/login");
          return;
        }
        setUser(data.user);
      })
      .catch(() => {
        setError("Unable to load profile.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">Loading dashboard…</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavBar user={user} />
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <section className="space-y-6 pb-8">
          <div className="rounded-[32px] border border-slate-800/90 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Dashboard</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Welcome back, {user?.name ?? "Farmer"}</h1>
                <p className="mt-3 max-w-2xl text-slate-400">Your farm operations are running smoothly. Use the menu to review crops, users, and the latest alerts.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 text-right ring-1 ring-slate-800/70">
                <p className="text-sm text-slate-400">Your role</p>
                <p className="mt-2 text-2xl font-semibold text-white">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <section className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "Crop health", value: "91%", label: "Overall condition" },
                  { name: "Water consumption", value: "12,400 L", label: "Today" },
                  { name: "Active sensors", value: "14", label: "Online" },
                  { name: "Next irrigation", value: "06:30 AM", label: "Greenhouse 1" },
                ].map((item) => (
                  <div key={item.name} className="rounded-3xl bg-slate-900/85 p-6 ring-1 ring-slate-800/70">
                    <p className="text-sm text-slate-400">{item.name}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/85 p-6 ring-1 ring-slate-800/70">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Field summary</h2>
                    <p className="mt-1 text-sm text-slate-400">Quick view of your active farm zones and crop status.</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {sampleFields.map((field) => (
                    <div key={field.name} className="rounded-3xl bg-slate-950/80 p-5 ring-1 ring-slate-800/70">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">{field.name}</p>
                          <p className="text-sm text-slate-400">Crop: {field.crop}</p>
                        </div>
                        <div className="flex gap-3 text-sm text-slate-300">
                          <span>Moisture: {field.moisture}</span>
                          <span>Status: {field.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/85 p-6 ring-1 ring-slate-800/70">
                <h2 className="text-xl font-semibold text-white">Action items</h2>
                <ul className="mt-5 space-y-4 text-slate-300">
                  <li className="rounded-3xl bg-slate-950/80 p-4">
                    <p className="font-semibold text-white">Inspect irrigation pump B</p>
                    <p className="mt-2 text-sm text-slate-400">Recommended before the afternoon watering cycle.</p>
                  </li>
                  <li className="rounded-3xl bg-slate-950/80 p-4">
                    <p className="font-semibold text-white">Review crop nutrition plan</p>
                    <p className="mt-2 text-sm text-slate-400">9 nutrient alerts from greenhouse sensors.</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/85 p-6 ring-1 ring-slate-800/70">
                <h2 className="text-xl font-semibold text-white">Admin access</h2>
                <p className="mt-2 text-sm text-slate-400">View user management and role controls.</p>
                {user?.role === "admin" ? (
                  <a href="/admin" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                    Open user admin
                  </a>
                ) : (
                  <p className="mt-5 rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">Admin route available only to administrators.</p>
                )}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
