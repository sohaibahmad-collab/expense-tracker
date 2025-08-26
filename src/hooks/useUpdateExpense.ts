import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { updateExpenseRequest } from "@src/store/slices/expenseSlice";
import type { IExpense } from "@src/types/expense";

export const useUpdateExpense = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (id: string, updated: Partial<IExpense>) => {
    dispatch(updateExpenseRequest({ id, updated }));
  };
};
