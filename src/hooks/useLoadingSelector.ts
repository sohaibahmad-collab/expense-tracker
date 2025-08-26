import { useSelector } from "react-redux";
import type { RootState } from "@src/store/store";


export const useLoadingSelector = () :boolean=> {
  return useSelector((state: RootState) => state.expenses.loading);
};
