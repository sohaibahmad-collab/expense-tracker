import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { addExpenseRequest } from "@src/store/slices/expenseSlice";
import type { IExpense } from "@src/types/expense";

export const useAddExpense = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (expense: Omit<IExpense, "id">) => {
    dispatch(addExpenseRequest(expense));
  };
};
