import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";
import { formatMoney } from "../utils/format.js";

const cardStyles = {
  balance: { icon: Wallet, iconBg: "bg-primary-soft", iconColor: "text-primary", label: "Total balance" },
  income: { icon: ArrowDownLeft, iconBg: "bg-emerald-50", iconColor: "text-emerald-700", label: "Total income" },
  expense: { icon: ArrowUpRight, iconBg: "bg-rose-50", iconColor: "text-rose-600", label: "Total expense" },
};

export default function SummaryCard({ kind, amount, helper }) {
  const style = cardStyles[kind];
  const Icon = style.icon;

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{style.label}</p>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${style.iconBg} ${style.iconColor}`}>
          <Icon size={22} />
        </span>
      </div>
      <p className="mt-5 text-[clamp(1.65rem,3vw,2.1rem)] font-extrabold tracking-tight text-ink">{formatMoney(amount)}</p>
      <p className="mt-2 text-xs text-slate-400">{helper}</p>
    </article>
  );
}