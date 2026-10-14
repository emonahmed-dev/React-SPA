import { useState } from "react";
import { Wallet, ClipboardCheck, Calculator, Database, ListFilter, Code2, RotateCcw, CheckCircle2 } from "lucide-react";

const concepts = [
  { icon: ClipboardCheck, title: "Controlled forms & validation", text: "The transaction form uses React state to manage input values and validates data before saving." },
  { icon: Calculator, title: "Derived calculations", text: "Balance, income, and expense totals are calculated from the transaction list instead of stored separately." },
  { icon: Database, title: "LocalStorage persistence", text: "Your transactions are saved in your browser and remain available after refreshing the page." },
  { icon: ListFilter, title: "Search & filter", text: "Search by title or category and filter records by income, expense, or category." },
];

export default function About({ onReset }) {
  const [showNotice, setShowNotice] = useState(false);

  function resetDemo() {
    onReset();
    setShowNotice(true);
    window.setTimeout(() => setShowNotice(false), 3500);
  }

  return (
    <main className="page-shell py-8 sm:py-10">
      <section className="overflow-hidden rounded-[2rem] bg-[#e4f5f1] p-6 sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/70 px-3 py-1.5 text-xs font-bold text-primary"><Wallet size={14} /> Personal finance tracker</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">About Spendly</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">A simple personal finance tracker built to make everyday money decisions feel clearer. Spendly is a frontend learning project focused on practical React fundamentals and a calm, useful interface.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-slate-600">React + JavaScript</span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-slate-600">Tailwind CSS</span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-slate-600">LocalStorage</span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-bold text-slate-600">Responsive UI</span>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5"><h2 className="text-2xl font-extrabold tracking-tight text-ink">Core concepts & architecture</h2><p className="mt-2 text-sm text-slate-500">A look at the frontend patterns used in this project.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {concepts.map((item) => {
            const Icon = item.icon;
            return <article key={item.title} className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon size={21} /></span>
              <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-secondary-soft text-secondary"><Code2 size={21} /></span>
            <div><h2 className="text-lg font-bold text-ink">Built for learning and demonstration</h2><p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">This demo uses sample transactions. Data is stored only in your browser; there is no account, backend, or bank connection.</p></div>
          </div>
          <button onClick={resetDemo} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"><RotateCcw size={16} /> Reset demo data</button>
        </div>
        {showNotice && <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"><CheckCircle2 size={17} /> Demo data has been reset.</p>}
      </section>
    </main>
  );
}