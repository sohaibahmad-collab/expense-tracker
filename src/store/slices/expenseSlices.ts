// src/store/slices/expensesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../../types/expense";

interface ExpensesState {
  items: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
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
    },
    addExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
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
    },
    updateExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    deleteExpenseRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteExpenseSuccess: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((exp) => exp.id !== action.payload);
      state.loading = false;
    },
    deleteExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
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
