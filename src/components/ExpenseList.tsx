

import ExpenseItem from "./ExpenseItem";
import { useExpensesSelector } from  "@src/hooks/useExpensesSelector";



export default function ExpenseList() {

   let expenses = useExpensesSelector();
  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Expenses</h2>
      <div className="divide-y rounded-lg border">
        {expenses.map((exp) => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
          />
        ))}
      </div>
    </div>
  );
}
