import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { IExpenseFormValues } from "@src/types/expenseForm";
import type { IExpense } from "@src/types/expense";
import Input from "@src/components/common/Input";
import Button from "@src/components/common/Button";
import { useDeleteExpense } from "@src/hooks/useDeleteExpense";
import { useUpdateExpense } from "@src/hooks/useUpdateExpense";
import { expenseSchema } from "@src/schemas/expenseSchema";
import { toast } from "react-toastify";
interface IExpenseItemProps {
  expense: IExpense;
}

export default function ExpenseItem({ expense }: IExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IExpenseFormValues>({
    resolver: yupResolver(expenseSchema),
    mode: "onChange",
    defaultValues: {
      name: expense.name,
      amount: expense.amount,
    },
  });

  const onSubmit = (data: IExpenseFormValues) => {
    if (data.name.trim() === "") {
      toast.error("Name cannot be empty");
      return;
    }
    updateExpense(expense.id, { name: data.name, amount: data.amount });
    setIsEditing(false);
    reset({ name: "", amount: 0 });
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-2 w-full items-center"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                label=""
                type="text"
                value={field.value}
                onChange={field.onChange}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                label=""
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={errors.amount?.message}
              />
            )}
          />
          <div>
            <Button type="submit" buttonText="Save" disabled={!isValid} />
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between w-full">
            <span>{expense.name}</span>
            <span>${expense.amount.toFixed(2)}</span>

            <div className="flex gap-2 ml-4">
              <Button onClick={() => setIsEditing(true)} icon="edit" />
              <Button
                onClick={() => deleteExpense(expense.id)}
                variant="danger"
                icon="delete"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
