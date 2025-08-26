import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IExpense } from "@src/types/expense";


interface IExpensesState {
  items: IExpense[];
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
    fetchExpensesSuccess: (state, action: PayloadAction<IExpense[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    fetchExpensesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    addExpenseRequest: (state, _action: PayloadAction<Omit<IExpense, "id">>) => {
      state.loading = true;
      
    },
    addExpenseSuccess: (state, action: PayloadAction<IExpense>) => {
      state.items.push(action.payload);
      state.loading = false;
     
    },
    addExpenseFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      
    },

    updateExpenseRequest: (
      state,
      _action: PayloadAction<{ id: string; updated: Partial<IExpense> }>
    ) => {
      state.loading = true;
    },
    updateExpenseSuccess: (state, action: PayloadAction<IExpense>) => {
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
