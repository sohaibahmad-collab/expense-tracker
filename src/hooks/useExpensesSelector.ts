import { useSelector } from "react-redux";
import type { RootState } from "@src/store/store";
import type { Expense } from "@src/types/expense";

export const useExpensesSelector = () :Expense[]=> {
  return useSelector((state: RootState) => state.expenses.items);
};
