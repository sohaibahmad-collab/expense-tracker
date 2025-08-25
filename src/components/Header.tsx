import { useExpensesSelector } from "@src/hooks/useExpensesSelector";

export default function Header() {
  const expenses = useExpensesSelector();
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold">Expense Tracker</h1>
      <p className="text-gray-600">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
