import { useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import About from "./pages/About.jsx";
import { seedTransactions } from "./data/seedTransactions.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { getTotals } from "./utils/format.js";
import Swal from "sweetalert2";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useLocalStorage(
    "spendly-transactions",
    seedTransactions,
  );

  // Totals are derived from transactions so the numbers stay in sync automatically.
  const totals = useMemo(() => getTotals(transactions), [transactions]);

  function addTransaction(newTransaction) {
    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  }

  async function deleteTransaction(transactionId) {
    const result = await Swal.fire({
      title: "Delete transaction?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    });

    // Cancel করলে transaction delete হবে না
    if (!result.isConfirmed) return;

    // Transaction delete করা
    setTransactions((currentTransactions) =>
      currentTransactions.filter((item) => item.id !== transactionId),
    );

    // Delete সফল হলে success message
    Swal.fire({
      title: "Deleted!",
      text: "Transaction deleted successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  function resetDemoData() {
    setTransactions(seedTransactions);
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar page={page} setPage={setPage} />
      {page === "dashboard" && (
        <Dashboard
          transactions={transactions}
          totals={totals}
          onAdd={addTransaction}
          setPage={setPage}
        />
      )}
      {page === "transactions" && (
        <Transactions
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      )}
      {page === "about" && <About onReset={resetDemoData} />}
      <Footer />
    </div>
  );
}
