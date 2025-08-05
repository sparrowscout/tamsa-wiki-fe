/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const createAxiosInstance = (
  baseURL: string,
  config?: AxiosRequestConfig
): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
};

export class HTTPClient {
  protected axiosInstance: AxiosInstance;
  protected service: string;

  constructor(axiosInstance: AxiosInstance, service = '') {
    this.axiosInstance = axiosInstance;
    this.service = service;
  }

  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  protected async get<T = any>(
    endpoint: string,
    config?: Omit<AxiosRequestConfig, 'url'>
  ): Promise<T> {
    return await this.axiosInstance
      .get(`/${this.service}${endpoint}`, config)
      .then((res) => this.handleResponse(res));
  }

  protected async post<T = any>(
    endpoint: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'url'>
  ): Promise<T> {
    return await this.axiosInstance
      .post(`/${this.service}${endpoint}` || '', data, config)
      .then((res) => this.handleResponse(res));
  }

  protected async put<T = any>(
    endpoint: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'url'>
  ): Promise<T> {
    return await this.axiosInstance
      .put(`/${this.service}${endpoint}` || '', data, config)
      .then((res) => this.handleResponse(res));
  }

  protected async put_normal<T = any>(endpoint: string, data?: any): Promise<T> {
    return await this.axiosInstance({
      url: endpoint,
      method: 'PUT',
      baseURL: '',
      data: data,
    }).then((res) => this.handleResponse(res));
  }

  protected async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'url'>
  ): Promise<T> {
    return await this.axiosInstance
      .patch(`/${this.service}${endpoint}`, data, config)
      .then((res) => this.handleResponse(res));
  }

  protected async delete<T = any>(
    endpoint: string,
    config?: Omit<AxiosRequestConfig, 'url'>
  ): Promise<T> {
    return await this.axiosInstance
      .delete(`/${this.service}${endpoint}`, config)
      .then((res) => this.handleResponse(res));
  }
}

const apiHost = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const axiosInstance = createAxiosInstance(apiHost);
