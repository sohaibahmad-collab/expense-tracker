
import { combineReducers } from "@reduxjs/toolkit";


import expensesReducer from "@src/store/slices/expenseSlice";


const rootReducer = combineReducers({
  expenses: expensesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
