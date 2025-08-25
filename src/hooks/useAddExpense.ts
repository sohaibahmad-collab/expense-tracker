import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { addExpenseRequest } from "@src/store/slices/expenseSlice";
import type { Expense } from "@src/types/expense";

export const useAddExpense = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (expense: Omit<Expense, "id">) => {
    dispatch(addExpenseRequest(expense));
  };
};
