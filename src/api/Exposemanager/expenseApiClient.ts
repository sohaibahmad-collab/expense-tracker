import baseApiClient from "@src/api/baseApiClass";
import type { Expense } from "@src/types/expense";

export default class expenseApiClient extends baseApiClient {
  private resourceUrl = "/expenses";

  constructor(baseURL: string) {
    super(baseURL);
  }

  // 🔹 Get all expenses
  async getExpenses(): Promise<Expense[]> {
    const data = await this.get<(Expense & { _id: string })[]>(this.resourceUrl);
    return data.map(exp => ({
      id: exp._id,
      name: exp.name,
      amount: exp.amount,
    }));
  }

  // 🔹 Get single expense
  async getExpense(id: string): Promise<Expense> {
    const data = await this.get<Expense & { _id: string }>(`${this.resourceUrl}/${id}`);
    return {
      id: data._id,
      name: data.name,
      amount: data.amount,
    };
  }

  // 🔹 Add new expense
  async addExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    const data = await this.post<Expense & { _id: string }>(this.resourceUrl, expense);
    return {
      id: data._id,
      name: data.name,
      amount: data.amount,
    };
  }

  // 🔹 Update entire expense (PUT)
  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    // ❌ CrudCrud rejects `id` or `_id` → remove it
    const { id: _, ...withoutId } = expense;

    const data = await this.put<Expense & { _id?: string }>(
      `${this.resourceUrl}/${id}`,
      withoutId
    );

    return {
      id: data._id ?? id, // fallback if API doesn’t echo back
      name: data.name ?? (expense.name as string),
      amount: data.amount ?? (expense.amount as number),
    };
  }

  // 🔹 Delete expense
  async deleteExpense(id: string): Promise<void> {
    return this.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
