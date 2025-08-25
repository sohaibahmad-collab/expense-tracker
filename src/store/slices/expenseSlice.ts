
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "@src/types/expense";
import { toast } from "react-toastify";

interface IExpensesState {
  items: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: IExpensesState = {
  items: [],
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    fetchExpensesRequest: (state) => {
      state.loading = true;
    },
    fetchExpensesSuccess: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchExpensesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    addExpenseRequest: (state, _action: PayloadAction<Omit<Expense, "id">>) => {
      state.loading = true;
      
    },
    addExpenseSuccess: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload);
      state.loading = false;
      // toast.success("Expense added successfully!");
    },
    addExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      // toast.error("Failed to add expense");
    },

    updateExpenseRequest: (
      state,
      _action: PayloadAction<{ id: string; updated: Partial<Expense> }>
    ) => {
      state.loading = true;
    },
    updateExpenseSuccess: (state, action: PayloadAction<Expense>) => {
      state.items = state.items.map((exp) =>
        exp.id === action.payload.id ? action.payload : exp
      );
      state.loading = false;
      // toast.success("Expense updated successfully!");
    },
    updateExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      // toast.error("Failed to update expense");
    },

    deleteExpenseRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteExpenseSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((exp) => exp.id !== action.payload);
      state.loading = false;
      // toast.success("Expense deleted successfully!");
    },
    deleteExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      // toast.error("Failed to delete expense");
    },
  },
});

export const {
  fetchExpensesRequest,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpenseRequest,
  addExpenseSuccess,
  addExpenseFailure,
  updateExpenseRequest,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  deleteExpenseFailure,
} = expensesSlice.actions;

export default expensesSlice.reducer;
