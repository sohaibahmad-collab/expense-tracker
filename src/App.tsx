import { useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import type { Expense } from "./types/expense";

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "Groceries", amount: 50 },
    { id: "2", name: "Rent", amount: 1200 },
    { id: "3", name: "Utilities", amount: 150 },
    { id: "4", name: "Gas", amount: 40 },
  ]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  const addExpense = () => {
    if (!name || !amount) return;
    const newExpense: Expense = {
      id: crypto.randomUUID(), // generate unique ID
      name,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const updateExpense = (id: string, updated: Partial<Expense>) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id ? { ...exp, ...updated } : exp
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-2xl p-6">
      <Header total={total} />
      <ExpenseForm
        name={name}
        amount={amount}
        setName={setName}
        setAmount={setAmount}
        addExpense={addExpense}
      />
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        updateExpense={updateExpense}
      />
    </div>
  );
}

