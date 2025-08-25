// src/store/sagas/rootSaga.ts
import { all, fork } from "redux-saga/effects";
import expensesSaga from "@src/store/sagas/expensesSaga";
// import authSaga from "./authSaga";   // example for future
// import userSaga from "./userSaga";   // example for future

export default function* rootSaga() {
  yield all([
    fork(expensesSaga),
    // fork(authSaga),
    // fork(userSaga),
  ]);
}
