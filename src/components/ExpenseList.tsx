import ExpenseItem from "@src/components/ExpenseItem";
import { useExpensesSelector } from "@src/hooks/useExpensesSelector";
import { useLoadingSelector } from "@src/hooks/useLoadingSelector";
import Spinner from "@src/components/common/Spinner";

export default function ExpenseList() {
  const loading = useLoadingSelector();
  const expenses = useExpensesSelector();

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Expenses</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="divide-y rounded-lg border">
          {expenses.map((exp) => (
            <ExpenseItem key={exp.id} expense={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
