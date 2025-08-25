
import Header from "@src/components/Header";
import ExpenseForm from "@src/components/ExpenseForm";
import ExpenseList from "@src/components/ExpenseList";
import Toast from "@src/components/common/Toast";
// import {toast} from 'react-toastify'
import { useFetchExpenses } from "@src/hooks/useFetchExpenses";



export default function App() {

  useFetchExpenses();
  return (
    <>
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-2xl p-6">
      <Header />
      <ExpenseForm/>
      <ExpenseList/>
    </div>
      <Toast/>
    </>
  );
}

