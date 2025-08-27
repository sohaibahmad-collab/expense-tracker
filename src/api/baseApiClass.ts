import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export default class BaseApiClient {
  protected api: AxiosInstance;

  constructor(resourceurl: string) {
    this.api = axios.create({
      baseURL: resourceurl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url);
    return response.data;
  }

  public async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  public async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  public async patch<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data);
    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }
}
