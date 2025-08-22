import Input from "./common/Input";
import Button from "./common/Button";

type ExpenseFormProps = {
  name: string;
  amount: string;
  setName: (value: string) => void;
  setAmount: (value: string) => void;
  addExpense: () => void;
};

export default function ExpenseForm({
  name,
  amount,
  setName,
  setAmount,
  addExpense,
}: ExpenseFormProps) {
  return (
    <div className="bg-white shadow rounded-2xl p-6 mb-6">
      <Input
        label="Name"
        type="text"
        value={name}
        onChange={(e: { target: { value: string; }; }) => setName(e.target.value)}
        placeholder="Name"
      />
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={(e: { target: { value: string; }; }) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <Button onClick={addExpense} className="w-full">
        Add Expense
      </Button>
    </div>
  );
}
