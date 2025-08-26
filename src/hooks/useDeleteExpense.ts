import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { deleteExpenseRequest } from "@src/store/slices/expenseSlice";

export const useDeleteExpense = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (id: string) => {
  
    dispatch(deleteExpenseRequest(id));
  };
};
