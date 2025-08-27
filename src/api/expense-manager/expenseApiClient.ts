import BaseApiClient from "@src/api/baseApiClass";
import type { IExpense } from "@src/types/expense";
import { API_BASE_URL, API_URL_PATHS } from "@src/config";
import { transformId, transformArray } from "@src/utils/transform";



export default class ExpenseApiClient extends BaseApiClient {
  private static resourceUrl = API_BASE_URL+API_URL_PATHS.expense;

  constructor() {
    super(ExpenseApiClient.resourceUrl);
  }

  async getExpenses(): Promise<IExpense[]> {
    const data = await this.get<(IExpense & { _id: string })[]>(
      ExpenseApiClient.resourceUrl
    );
    return transformArray(data);
  }

  async getExpense(id: string): Promise<IExpense> {
    const data = await this.get<IExpense & { _id: string }>(
      `${ExpenseApiClient.resourceUrl}/${id}`
    );
    return transformId(data);
  }

  async addExpense(expense: Omit<IExpense, "id">): Promise<IExpense> {
    const data = await this.post<IExpense & { _id: string }>(
      ExpenseApiClient.resourceUrl,
      expense
    );
    return transformId(data);
  }

  async updateExpense(
    id: string,
    expense: Partial<IExpense>
  ): Promise<IExpense> {
    const data = await this.put<IExpense & { _id?: string }>(
      `${ExpenseApiClient.resourceUrl}/${id}`,
      expense
    );
    return transformId(data);
  }

  async deleteExpense(id: string): Promise<void> {
    return this.delete<void>(`${ExpenseApiClient.resourceUrl}/${id}`);
  }
}
