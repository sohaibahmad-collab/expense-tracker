import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { updateExpenseRequest } from "@src/store/slices/expenseSlice";
import type { Expense } from "@src/types/expense";

export const useUpdateExpense = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (id: string, updated: Partial<Expense>) => {
    console.log("Updating expense with id:", id, "and data:", updated);
    dispatch(updateExpenseRequest({ id, updated }));
  };
};
