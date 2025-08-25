import { useState } from "react";
import type { Expense } from "@src/types/expense";
import Input from "@src/components/common/Input";
import Button from "@src/components/common/Button";
import { useDeleteExpense } from "@src/hooks/useDeleteExpense";
import { useUpdateExpense } from "@src/hooks/useUpdateExpense";
type ExpenseItemProps = {
  expense: Expense;
};

export default function ExpenseItem({
  expense,
}: ExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(expense.name);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();

  const handleSave = () => {
    if (!editName || !editAmount) return;
    updateExpense(expense.id, { name: editName, amount: parseFloat(editAmount) });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white">
      {isEditing ? (
        <div className="flex gap-2 w-full items-center">
          <Input
            label=""
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Input
            label=""
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
          <Button onClick={handleSave} buttonText="Save"></Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-full">
            <span>{expense.name}</span>
            <span>${expense.amount.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 ml-4">
            <Button onClick={() => setIsEditing(true)} buttonText="Update"></Button>
            <Button onClick={() => deleteExpense(expense.id)} variant="danger" buttonText="Delete">
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
