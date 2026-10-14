import { useMemo, useState } from "react";
import { Search, X, ReceiptText, SlidersHorizontal } from "lucide-react";
import TransactionRow from "../components/TransactionRow.jsx";
import { categories } from "../data/seedTransactions.js";
import { formatMoney, getTotals } from "../utils/format.js";

export default function Transactions({ transactions, onDelete }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return [...transactions]
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()) || item.category.toLowerCase().includes(query.toLowerCase().trim()))
      .filter((item) => typeFilter === "all" || item.type === typeFilter)
      .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, query, typeFilter, categoryFilter]);

  const totals = getTotals(transactions);
  const incomeCount = transactions.filter((item) => item.type === "income").length;
  const expenseCount = transactions.filter((item) => item.type === "expense").length;

  function resetFilters() {
    setQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
  }

  return (
    <main className="page-shell py-8 sm:py-10">
      <section className="mb-7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary-soft px-3 py-1.5 text-xs font-semibold text-secondary">
          <ReceiptText size={14} /> Ledger & activity
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Transactions</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">View and manage your income and expenses.</p>
      </section>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-slate-500">Total net balance</p><p className="mt-2 text-2xl font-extrabold text-ink">{formatMoney(totals.balance)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-slate-500">Total received</p><p className="mt-2 text-2xl font-extrabold text-emerald-700">{formatMoney(totals.income)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-slate-500">Total spent</p><p className="mt-2 text-2xl font-extrabold text-rose-600">{formatMoney(totals.expense)}</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div><h2 className="text-lg font-bold text-ink">All activity</h2><p className="mt-1 text-sm text-slate-500">{transactions.length} recorded {transactions.length === 1 ? "transaction" : "transactions"}</p></div>
          <div className="relative w-full sm:max-w-xs">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none focus:border-primary" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"><X size={16} /></button>}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: `All (${transactions.length})` },
              { value: "income", label: `Income (${incomeCount})` },
              { value: "expense", label: `Expense (${expenseCount})` },
            ].map((filter) => (
              <button key={filter.value} onClick={() => setTypeFilter(filter.value)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${typeFilter === filter.value ? "bg-primary text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {filter.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <SlidersHorizontal size={15} />
            <span className="sr-only">Filter by category</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="max-w-[190px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-primary">
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-1">
          {filteredTransactions.length > 0 ? filteredTransactions.map((item) => <TransactionRow key={item.id} transaction={item} onDelete={onDelete} showDelete />) : (
            <div className="px-3 py-16 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Search size={24} /></span>
              <h3 className="mt-4 text-base font-bold text-ink">No matching transactions</h3>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">Try changing your search or filters to find what you're looking for.</p>
              <button onClick={resetFilters} className="mt-4 rounded-xl bg-primary-soft px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/10">Reset filters</button>
            </div>
          )}
        </div>
        <p className="mt-4 text-xs text-slate-400">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
      </section>
    </main>
  );
}