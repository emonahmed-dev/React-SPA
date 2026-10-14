import { useState } from "react";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { categories } from "../data/seedTransactions.js";

const today = new Date().toISOString().slice(0, 10);

export default function TransactionForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0 || !date) {
      setError("Please enter a title, a positive amount, and a date.");
      return;
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
    setDate(today);
    setError("");
  }

  return (
    <section id="add-transaction" className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-ink">Quick add transaction</h2>
          <p className="mt-1 text-sm text-slate-500">Record a new entry</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-soft text-primary"><Plus size={21} /></span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-surface-low p-1">
          <button type="button" onClick={() => setType("expense")} className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${type === "expense" ? "bg-white text-rose-600 shadow-sm" : "text-slate-500"}`}>
            <TrendingDown size={17} /> Expense
          </button>
          <button type="button" onClick={() => setType("income")} className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${type === "income" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}>
            <TrendingUp size={17} /> Income
          </button>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-600">Description</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Grocery shopping" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-primary" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">Amount (৳)</span>
            <input type="number" min="1" step="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-slate-600">Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-primary">
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-600">Date</span>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-primary" />
        </label>

        {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-container">
          <Plus size={18} /> Add transaction
        </button>
        <p className="text-center text-[11px] text-slate-400">Your entries stay saved in this browser.</p>
      </form>
    </section>
  );
}