"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/crops", label: "Crops" },
  { href: "/soil", label: "Soil" },
  { href: "/irrigation", label: "Irrigation" },
  { href: "/weather", label: "Weather" },
  { href: "/equipment", label: "Equipment" },
  { href: "/fertilizer", label: "Fertilizer" },
  { href: "/yield", label: "Yield" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/suppliers", label: "Suppliers" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setMounted(true);
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-400">SmartAgriAI</p>
          <p className="mt-1 text-base font-semibold text-slate-100">Farm management platform</p>
        </div>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm transition ${pathname === item.href ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`rounded-full px-3 py-2 text-sm transition ${pathname === "/login" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`rounded-full px-3 py-2 text-sm transition ${pathname === "/register" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {mounted && user ? (
            <>
              <div className="text-right text-sm">
                <p className="font-semibold text-slate-100">{user.name}</p>
                <p className="text-slate-400">{user.role}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-emerald-400 hover:text-emerald-300"
              >
                Sign out
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              Sign in
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
