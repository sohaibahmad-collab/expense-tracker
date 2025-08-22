import { useState } from "react";
import type { Expense } from "../types/expense";
import Input from "./common/Input";
import Button from "./common/Button";

type ExpenseListProps = {
  expenses: Expense[];
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updated: Partial<Expense>) => void;
};

export default function ExpenseList({
  expenses,
  deleteExpense,
  updateExpense,
}: ExpenseListProps) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleEdit = (exp: Expense) => {
    setEditId(exp.id);
    setEditName(exp.name);
    setEditAmount(exp.amount.toString());
  };

  const handleSave = (id: string) => {
    if (!editName || !editAmount) return;
    updateExpense(id, { name: editName, amount: parseFloat(editAmount) });
    setEditId(null);
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Expenses</h2>
      <div className="divide-y rounded-lg border">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-center px-4 py-2 bg-white"
          >
            {editId === exp.id ? (
              <div className="flex gap-2 w-full items-center">
                <Input
                  label=""
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1"
                />
                <Input
                  label=""
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-24"
                />
                <Button onClick={() => handleSave(exp.id)}>Save</Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between w-full">
                  <span>{exp.name}</span>
                  <span>${exp.amount.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button onClick={() => handleEdit(exp)}>Update</Button>
                  <Button
                    onClick={() => deleteExpense(exp.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
