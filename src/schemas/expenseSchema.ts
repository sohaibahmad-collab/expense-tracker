import * as yup from "yup";

export const expenseSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than zero")
    .required("Amount is required"),
});
