
import { useState } from "react";
import Input from "@src/components/common/Input";
import Button from "@src/components/common/Button";
import { useAddExpense } from "@src/hooks/useAddExpense";

export default function ExpenseForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const addExpense = useAddExpense();

  const handleAddExpense = () => {
    if (!name || !amount) return;

    addExpense({
      name,
      amount: Number(amount),
    });

   
    setName("");
    setAmount("");
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mb-6">
      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="Name"
      />
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAmount(e.target.value)
        }
        placeholder="Amount"
      />
      <Button onClick={handleAddExpense} buttonText="Add Expense">
      </Button>
    </div>
  );
}
