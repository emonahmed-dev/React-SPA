import { ArrowDownLeft, ArrowUpRight, Coffee, Bus, ShoppingBag, BriefcaseBusiness, Wallet, Trash2 } from "lucide-react";
import { formatDate, formatMoney } from "../utils/format.js";

const categoryIcons = {
  Food: Coffee,
  Transport: Bus,
  Shopping: ShoppingBag,
  Salary: Wallet,
  Freelance: BriefcaseBusiness,
};

export default function TransactionRow({ transaction, onDelete, showDelete = false }) {
  const Icon = categoryIcons[transaction.category] || Wallet;
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center gap-3 border-b border-slate-100 py-4 last:border-b-0">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${isIncome ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
        <Icon size={19} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-ink">{transaction.title}</p>
        <p className="mt-1 text-xs text-slate-400">{transaction.category} <span className="px-1">·</span> {formatDate(transaction.date)}</p>
      </div>
      <div className="text-right">
        <p className={`whitespace-nowrap text-sm font-bold ${isIncome ? "text-emerald-700" : "text-ink"}`}>
          {isIncome ? "+" : "−"} {formatMoney(Number(transaction.amount))}
        </p>
        {showDelete && (
          <button onClick={() => onDelete(transaction.id)} className="mt-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label={`Delete ${transaction.title}`}>
            <Trash2 size={13} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}