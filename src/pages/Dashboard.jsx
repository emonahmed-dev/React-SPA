import { ArrowRight, Plus, Sparkles } from "lucide-react";
import SummaryCard from "../components/SummaryCard.jsx";
import TransactionRow from "../components/TransactionRow.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import { formatMoney } from "../utils/format.js";

export default function Dashboard({ transactions, totals, onAdd, setPage }) {
  const recentTransactions = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <main className="page-shell py-8 sm:py-10">
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles size={14} /> Your money, made clearer
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Good to see you! <span aria-hidden="true">👋</span></h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">Here's your financial overview.</p>
        </div>
        <button onClick={() => document.getElementById("add-transaction")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-container sm:self-auto">
          <Plus size={18} /> New transaction
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard kind="balance" amount={totals.balance} helper="Income minus expenses" />
        <SummaryCard kind="income" amount={totals.income} helper="All recorded income" />
        <SummaryCard kind="expense" amount={totals.expense} helper="All recorded expenses" />
      </section>

      <section className="mt-7 grid items-start gap-6 lg:grid-cols-[1.25fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-ink">Recent transactions</h2>
              <p className="mt-1 text-sm text-slate-500">Your latest cash flows and adjustments</p>
            </div>
            <button onClick={() => setPage("transactions")} className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-primary hover:bg-primary-soft sm:text-sm">
              View all <ArrowRight size={15} />
            </button>
          </div>
          <div className="mt-3">
            {recentTransactions.length > 0 ? recentTransactions.map((item) => <TransactionRow key={item.id} transaction={item} />) : (
              <div className="py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-300">receipt_long</span>
                <p className="mt-3 text-sm font-semibold text-ink">No transactions yet</p>
                <p className="mt-1 text-xs text-slate-400">Add your first transaction to get started.</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface-low px-3 py-3 text-xs text-slate-500">
            <span className="material-symbols-outlined text-base text-primary">sync_saved_locally</span>
            {transactions.length} recorded {transactions.length === 1 ? "transaction" : "transactions"} · saved locally
          </div>
        </div>

        <TransactionForm onAdd={onAdd} />
      </section>

      <section className="mt-6 flex flex-col gap-3 rounded-3xl bg-[#e3f5f1] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/80 text-primary"><span className="material-symbols-outlined">tips_and_updates</span></span>
          <div><h3 className="text-sm font-bold text-ink">Small steps build healthy habits.</h3><p className="mt-1 text-sm text-slate-600">Keep your entries up to date to understand your spending better.</p></div>
        </div>
        <p className="text-sm font-bold text-primary">{formatMoney(totals.balance)} net balance</p>
      </section>
    </main>
  );
}