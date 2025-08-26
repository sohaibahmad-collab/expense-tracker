
import { useState } from "react";
import Input from "@src/components/common/Input";
import Button from "@src/components/common/Button";
import { useAddExpense } from "@src/hooks/useAddExpense";

export default function ExpenseForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const addExpense = useAddExpense();

  const handleAddExpense = (name:string,amount:Number) => {
    if (!name || !amount) return;

    addExpense({
      name,
      amount: Number(amount),
    });

   
    setName("");
    setAmount(0);
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
          setAmount(e.target.value ? parseFloat(e.target.value) : 0)
        }
        placeholder="Amount"
      />
      <Button onClick={()=>handleAddExpense(name,amount)} buttonText="Add Expense">
      </Button>
    </div>
  );
}
