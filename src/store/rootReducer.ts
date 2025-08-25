// src/store/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";

// import slices
import expensesReducer from "@src/store/slices/expenseSlice";
// import authReducer from "./slices/authSlice";   // example
// import userReducer from "./slices/userSlice";   // example

const rootReducer = combineReducers({
  expenses: expensesReducer,
  // auth: authReducer,
  // user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
