// src/store/sagas/expensesSaga.ts
import { call, put, select, takeLatest, all } from "redux-saga/effects";


import {toast } from 'react-toastify'

import {
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
} from "@src/store/slices/expenseSlice";
import type { Expense } from "@src/types/expense";
import expenseApiClient from "@src/api/Exposemanager/expenseApiClient";
import type  { RootState } from "@src/store/store";


const client = new expenseApiClient(); 


const selectExpenses = (state: RootState) => state.expenses.items;

// ----------------------------
// WORKERS
// ----------------------------

// Fetch all expenses
function* fetchExpensesSaga() {
  try {
    const data: Expense[] = yield call([client, client.getExpenses]); // ✅ correct, but TS sometimes complains
    yield put(fetchExpensesSuccess(data));
    if(data.length>0){
        toast.success("data fetched successfully")
    }
    // toast.
  } catch (err: any) {
    yield put(fetchExpensesFailure(err.message));
    toast.error("failed to fetch data")
    // toast.s
  }
}

// Add (or merge if same name)
function* addExpenseSaga(action: ReturnType<typeof addExpenseRequest>) {
  try {
    const { name, amount } = action.payload;

    // get current state
    const expenses: Expense[] = yield select(selectExpenses);
    const existing = expenses.find(
      (exp) => exp.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
      // merge logic: increase amount
      const updated: Expense = {
        ...existing,
        amount: existing.amount + amount,
      };

      // call API (doesn't return data)
      yield call([client, client.updateExpense], existing.id, updated);

      // dispatch merged manually
      yield put(updateExpenseSuccess(updated));
       
        // toast.success("Expense merged successfully")
    } else {
      const response: Expense = yield call(
        [client, client.addExpense],
        { name, amount }
      );
      yield put(addExpenseSuccess(response));
        // Toast("Expense added successfully", "success")
      toast.success("Expense added successfully")
        // toast.success()
    }
  } catch (err: any) {
    yield put(addExpenseFailure(err.message));
    // Toast("Failed to add expense", "error")
    toast.error("Failed to add expense")
  }
}


// Update expense
function* updateExpenseSaga(action: ReturnType<typeof updateExpenseRequest>) {
  try {
    const { id, updated } = action.payload;

    yield call([client, client.updateExpense], id, updated);

    // get existing item from state
    const expenses: Expense[] = yield select((state: RootState) => state.expenses.items);
    const existing = expenses.find(exp => exp.id === id);

    if (!existing) throw new Error("Expense not found in state");

    // merge old + new to guarantee full Expense
    const merged: Expense = {
      ...existing,
      ...updated,
    };

    yield put(updateExpenseSuccess(merged));
    // Toast("Expense updated successfully", "success")
    toast.success("Expense updated successfully")
  } catch (err: any) {
    yield put(updateExpenseFailure(err.message));
    toast.error("Failed to update expense")
    // Toast("Failed to update expense", "error")
  }
}

// Delete expense
function* deleteExpenseSaga(action: ReturnType<typeof deleteExpenseRequest>) {
  try {
    yield call([client, client.deleteExpense], action.payload);
    yield put(deleteExpenseSuccess(action.payload));
    // Toast("Expense deleted successfully", "success")
    toast.success("expense deleted successfully")

    
  } catch (err: any) {
    yield put(deleteExpenseFailure(err.message));
    toast.error("expense failed to delete")
    
  }
}

// ----------------------------
// WATCHERS
// ----------------------------
function* watchFetchExpenses() {
  yield takeLatest(fetchExpensesRequest.type, fetchExpensesSaga);
}

function* watchAddExpense() {
  yield takeLatest(addExpenseRequest.type, addExpenseSaga);
}

function* watchUpdateExpense() {
  yield takeLatest(updateExpenseRequest.type, updateExpenseSaga);
}

function* watchDeleteExpense() {
  yield takeLatest(deleteExpenseRequest.type, deleteExpenseSaga);
}

// ----------------------------
// ROOT SAGA
// ----------------------------
export default function* expensesSaga() {
  yield all([
    watchFetchExpenses(),
    watchAddExpense(),
    watchUpdateExpense(),
    watchDeleteExpense(),
  ]);
}
