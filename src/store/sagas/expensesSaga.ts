
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


function* fetchExpensesSaga() {
  try {
    const data: Expense[] = yield call([client, client.getExpenses]); // ✅ correct, but TS sometimes complains
    yield put(fetchExpensesSuccess(data));
    if(data.length>0){
        toast.success("data fetched successfully")
    }
  
  } catch (err: any) {
    yield put(fetchExpensesFailure(err.message));
    toast.error("failed to fetch data")
   
  }
}


function* addExpenseSaga(action: ReturnType<typeof addExpenseRequest>) {
  try {
    const { name, amount } = action.payload;

    
    const expenses: Expense[] = yield select(selectExpenses);
    const existing = expenses.find(
      (exp) => exp.name.toLowerCase() === name.toLowerCase()
    );

    if (existing) {
     
      const updated: Expense = {
        ...existing,
        amount: existing.amount + amount,
      };

     
      yield call([client, client.updateExpense], existing.id, updated);

      
      yield put(updateExpenseSuccess(updated));
       
       
    } else {
      const response: Expense = yield call(
        [client, client.addExpense],
        { name, amount }
      );
      yield put(addExpenseSuccess(response));
        
      toast.success("Expense added successfully")
        
    }
  } catch (err: any) {
    yield put(addExpenseFailure(err.message));
   
    toast.error("Failed to add expense")
  }
}



function* updateExpenseSaga(action: ReturnType<typeof updateExpenseRequest>) {
  try {
    const { id, updated } = action.payload;

    yield call([client, client.updateExpense], id, updated);

  
    const expenses: Expense[] = yield select((state: RootState) => state.expenses.items);
    const existing = expenses.find(exp => exp.id === id);

    if (!existing) throw new Error("Expense not found in state");

   
    const merged: Expense = {
      ...existing,
      ...updated,
    };

    yield put(updateExpenseSuccess(merged));
   
    toast.success("Expense updated successfully")
  } catch (err: any) {
    yield put(updateExpenseFailure(err.message));
    toast.error("Failed to update expense")
    
  }
}


function* deleteExpenseSaga(action: ReturnType<typeof deleteExpenseRequest>) {
  try {
    yield call([client, client.deleteExpense], action.payload);
    yield put(deleteExpenseSuccess(action.payload));

    toast.success("expense deleted successfully")

    
  } catch (err: any) {
    yield put(deleteExpenseFailure(err.message));
    toast.error("expense failed to delete")
    
  }
}





export default function* expensesSaga() {
  yield all([
   takeLatest(fetchExpensesRequest.type, fetchExpensesSaga),
   takeLatest(addExpenseRequest.type, addExpenseSaga),
   takeLatest(updateExpenseRequest.type, updateExpenseSaga),
   takeLatest(deleteExpenseRequest.type, deleteExpenseSaga),
  ]);
}
