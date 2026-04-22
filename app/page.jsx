import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 rounded-[32px] border border-slate-800/90 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400">Smarter farming starts here</p>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Smart agriculture management for modern farms.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Monitor crops, automate irrigation, and manage farm teams with an intelligent dashboard built for farmers, managers, and administrators.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                Sign in
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300">
                Create account
              </Link>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-800/80 bg-slate-950/80 p-8 shadow-xl shadow-slate-950/20">
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Farm overview</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Crop health", value: "91%" },
                    { label: "Soil moisture", value: "43%" },
                    { label: "Water usage", value: "12,400 L" },
                    { label: "Irrigation active", value: "3/5 zones" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-3xl bg-slate-950 p-4">
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-slate-900 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Highlights</p>
                <ul className="mt-5 space-y-4 text-slate-300">
                  <li className="rounded-3xl border border-slate-800/70 p-4">
                    <p className="font-semibold text-white">Automated irrigation schedule</p>
                    <p className="mt-2 text-sm">Next watering starts at 6:30 AM for greenhouse zones.</p>
                  </li>
                  <li className="rounded-3xl border border-slate-800/70 p-4">
                    <p className="font-semibold text-white">Sensor network health</p>
                    <p className="mt-2 text-sm">All 14 sensor units reporting normally with no connectivity issues.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
