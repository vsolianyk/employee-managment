import axios, { AxiosResponse } from 'axios';

interface RequestConfig {
  method: string;
  url: string;
  withCredentials?: boolean;
  data?: object;
  headers?: object;
  params?: object;
}

class Api {
  baseURL: string;
  token?: string;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.token = token;
  }
  async get<T = any>(url: string, params?: object): Promise<any> {
    return this.request('get', url, {}, params);
  }

  async post(url: string, data?: object, params?: object): Promise<any> {
    return this.request('post', url, data, params);
  }

  async put(url: string, data?: object, params?: object): Promise<any> {
    return this.request('put', url, data, params);
  }

  async patch(url: string, data?: object, params?: object): Promise<any> {
    return this.request('patch', url, data, params);
  }

  async delete(url: string): Promise<any> {
    return this.request('delete', url);
  }

  async request<T = any>(method: string, url: string, data?: object, params?: object): Promise<any> {
    const config: RequestConfig = { method, url: `${this.baseURL}${url}`, withCredentials: true };

    if (data) {
      config.data = data;
    }
    if (params) {
      config.params = params;
    }

    return axios(config) as Promise<AxiosResponse<T>>;
  }
}

export default Api;
