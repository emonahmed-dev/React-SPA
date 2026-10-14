import { Menu, Wallet, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "transactions", label: "Transactions" },
  { id: "about", label: "About" },
];

export default function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function choosePage(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between gap-5">
        <button className="flex items-center gap-3 text-left" onClick={() => choosePage("dashboard")} aria-label="Spendly home">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-sm">
            <Wallet size={22} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-xl font-extrabold tracking-tight text-ink">Spendly<span className="text-primary">.</span></span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">Personal finance</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => choosePage(item.id)}
              className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                page === item.id ? "bg-primary-soft text-primary" : "text-slate-500 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-slate-500">Saved on this device</span>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-ink md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="page-shell grid gap-1 pb-4 md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => choosePage(item.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-semibold ${
                page === item.id ? "bg-primary-soft text-primary" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}