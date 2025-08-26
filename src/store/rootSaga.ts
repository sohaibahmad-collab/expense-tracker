
import { all, fork } from "redux-saga/effects";
import expensesSaga from "@src/store/sagas/expensesSaga";

export default function* rootSaga() {
  yield all([
    fork(expensesSaga),
  ]);
}
