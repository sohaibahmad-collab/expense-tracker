


import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export default class BaseApiClient {
  protected api: AxiosInstance;

  // ✅ Store base URL inside parent class
  protected static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL;

  constructor() {

    this.api = axios.create({
      baseURL: BaseApiClient.BASE_URL, // use static BASE_URL
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Axios base URL:", this.api.defaults.baseURL);
  }

  // GET
  public async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url);
    return response.data;
  }

  // POST
  public async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  // PUT
  public async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  // PATCH
  public async patch<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data);
    return response.data;
  }

  // DELETE
  public async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }
}
