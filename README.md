# Spendly — Personal Finance Tracker

Spendly is a responsive personal finance tracker built with React and JavaScript. It lets you record income and expenses, review totals, and search/filter your transaction history.

## Features

- Dashboard with balance, income, and expense summaries
- Add income or expense transactions
- Search transactions by title or category
- Filter by transaction type and category
- Delete transactions
- Save data in browser LocalStorage
- Responsive layout for mobile, tablet, and desktop
- About page with a reset-demo-data option

## Tech stack

- React
- JavaScript
- Vite
- Tailwind CSS
- Lucide React icons
- Browser LocalStorage

## Run locally

1. Install Node.js (LTS) if it is not installed.
2. Extract or open this project folder in your code editor.
3. Open the terminal in this folder.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in your terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Notes

- This is a frontend demonstration project. It does not connect to a bank or use a backend.
- Transactions are saved in the current browser only.
- The starting transactions are sample/demo data.
