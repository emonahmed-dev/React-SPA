export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200/80 bg-white/50">
      <div className="page-shell flex flex-col gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Spendly Tracker. <span className="text-slate-300">•</span> Simple personal financial clarity.</p>
        <p className="flex flex-wrap gap-4"><span>Privacy-friendly</span><span>Local storage</span><span>Made for learning</span></p>
      </div>
    </footer>
  );
}