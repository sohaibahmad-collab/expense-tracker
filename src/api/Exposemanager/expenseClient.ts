import baseApiClient from "@api/Api/BaseApiClass";
import type {Expense } from "../../types/expense";

export default class expenseClient extends baseApiClient {
  private resourceUrl = "/expenses";

  constructor(baseURL: string) {
    super(baseURL);
  }

  // Get all expenses
  async getExpenses(): Promise<Expense[]> {
    return this.get<Expense[]>(this.resourceUrl);
  }

  // Get single expense
  async getExpense(id: string): Promise<Expense> {
    return this.get<Expense>(`${this.resourceUrl}/${id}`);
  }

  // Add new expense
  async addExpense(expense: Omit<Expense, "id">): Promise<Expense> {
    return this.post<Expense>(this.resourceUrl, expense);
  }

  // Update entire expense (PUT)
  async updateExpense(id: string, expense: Expense): Promise<Expense> {
    return this.put<Expense>(`${this.resourceUrl}/${id}`, expense);
  }

  // Update partial expense (PATCH)
  async patchExpense(id: string, partial: Partial<Expense>): Promise<Expense> {
    return this.patch<Expense>(`${this.resourceUrl}/${id}`, partial);
  }

  // Delete expense
  async deleteExpense(id: string): Promise<void> {
    return this.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
