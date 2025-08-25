import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@src/store/store";
import { fetchExpensesRequest } from "@src/store/slices/expenseSlice";

export const useFetchExpenses = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchExpensesRequest());
  }, [dispatch]);
};
