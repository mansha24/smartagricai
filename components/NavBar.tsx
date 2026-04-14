"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/farmers", label: "Farmers" },
  { href: "/admin", label: "Admin" },
];

type NavBarProps = {
  user?: { name: string; role: string } | null;
};

export default function NavBar({ user }: NavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const signOut = () => {
    localStorage.removeItem("smartagri_token");
    localStorage.removeItem("smartagri_user");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-400">SmartAgriAI</p>
          <p className="mt-1 text-base font-semibold text-slate-100">Farm management platform</p>
        </div>

        <nav className="flex items-center gap-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm transition ${pathname === item.href ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}
            >
              {item.label}
            </a>
          ))}
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
