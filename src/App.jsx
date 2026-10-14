import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import About from "./pages/About.jsx";
import { seedTransactions } from "./data/seedTransactions.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { getTotals } from "./utils/format.js";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useLocalStorage("spendly-transactions", seedTransactions);

  // Totals are derived from transactions so the numbers stay in sync automatically.
  const totals = useMemo(() => getTotals(transactions), [transactions]);

  function addTransaction(newTransaction) {
    setTransactions((currentTransactions) => [newTransaction, ...currentTransactions]);
  }

  function deleteTransaction(transactionId) {
    const shouldDelete = window.confirm("Delete this transaction?");
    if (!shouldDelete) return;
    setTransactions((currentTransactions) =>
      currentTransactions.filter((item) => item.id !== transactionId)
    );
  }

  function resetDemoData() {
    setTransactions(seedTransactions);
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar page={page} setPage={setPage} />
      {page === "dashboard" && (
        <Dashboard transactions={transactions} totals={totals} onAdd={addTransaction} setPage={setPage} />
      )}
      {page === "transactions" && (
        <Transactions transactions={transactions} onDelete={deleteTransaction} />
      )}
      {page === "about" && <About onReset={resetDemoData} />}
      <Footer />
    </div>
  );
}