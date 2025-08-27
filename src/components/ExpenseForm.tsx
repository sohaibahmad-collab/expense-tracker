import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@src/components/common/Input";
import Button from "@src/components/common/Button";
import { useAddExpense } from "@src/hooks/useAddExpense";
import type { IExpenseFormValues } from "@src/types/expenseForm";
import { expenseSchema } from "@src/schemas/expenseSchema";
import { toast } from "react-toastify";

export default function ExpenseForm() {
  let addExpense = useAddExpense();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    mode: "onChange",
  });

  const onSubmit = (data: IExpenseFormValues) => {
    if (data.name.trim() === "") {
      toast.error("Name cannot be empty");
      return;
    }
    addExpense(data);
    reset({ name: "", amount: 0 });
  };

  return (
    <div className="bg-white shadow rounded-2xl p-6 mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Name"
              type="text"
              value={field.value}
              onChange={field.onChange}
              placeholder="Name"
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              label="Amount"
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              placeholder="Amount"
              error={errors.amount?.message}
            />
          )}
        />

        <div className="flex justify-center ">
          <Button type="submit" buttonText="Add Expense" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
}
