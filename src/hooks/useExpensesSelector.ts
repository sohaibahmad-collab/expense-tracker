import { useSelector } from "react-redux";
import type { RootState } from "@src/store/store";
import type { IExpense } from "@src/types/expense";

export const useExpensesSelector = (): IExpense[] => {
  return useSelector((state: RootState) => state.expenses.items);
};
