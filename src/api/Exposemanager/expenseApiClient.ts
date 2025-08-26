// 

import BaseApiClient from "@src/api/baseApiClass";
import type { Expense } from "@src/types/expense";
import { API_URL_PATHS } from "@src/config";

export default class ExpenseApiClient extends BaseApiClient {
  private resourceUrl = API_URL_PATHS.expense;

  constructor() {
     console.log("Base URL:", BaseApiClient.BASE_URL)
    super(); // no need to pass base URL, parent already knows it
  }

  async getExpenses(): Promise<Expense[]> {
    const data = await this.get<(Expense & { _id: string })[]>(this.resourceUrl);
    return data.map(exp => ({
      id: exp._id,
      name: exp.name,
      amount: exp.amount,
    }));
  }

  async getExpense(id: string): Promise<Expense> {
    const data = await this.get<Expense & { _id: string }>(`${this.resourceUrl}/${id}`);
    return { id: data._id, name: data.name, amount: data.amount };
  }

  async addExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    const data = await this.post<Expense & { _id: string }>(this.resourceUrl, expense);
    return { id: data._id, name: data.name, amount: data.amount };
  }

  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    const { id: _, ...withoutId } = expense;
    const data = await this.put<Expense & { _id?: string }>(`${this.resourceUrl}/${id}`, withoutId);
    return { id: data._id ?? id, name: data.name ?? expense.name!, amount: data.amount ?? expense.amount! };
  }

  async deleteExpense(id: string): Promise<void> {
    return this.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
