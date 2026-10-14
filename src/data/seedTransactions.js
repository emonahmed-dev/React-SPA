// Demo data helps the dashboard look complete on the first visit.
export const seedTransactions = [
  { id: 1, title: "Lunch", category: "Food", amount: 350, type: "expense", date: "2026-10-24" },
  { id: 2, title: "Monthly Salary", category: "Salary", amount: 40000, type: "income", date: "2026-10-22" },
  { id: 3, title: "Bus Fare", category: "Transport", amount: 80, type: "expense", date: "2026-10-21" },
  { id: 4, title: "Groceries", category: "Shopping", amount: 2500, type: "expense", date: "2026-10-20" },
  { id: 5, title: "Web Design", category: "Freelance", amount: 5000, type: "income", date: "2026-10-18" },
];

export const categories = [
  "Food", "Transport", "Shopping", "Salary", "Freelance", "Bills", "Health", "Education", "Other"
];