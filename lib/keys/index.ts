import { createRequest, DSFactory } from '../factory';
import { APIKeyDeleteResult, APIKeyListResult, APIKeyResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../types';

export class Keys {
  readonly headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }
  async list(options?: RequestOptions) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/keys',
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
        per_page: options?.limit ?? 10,
        page: options?.page ?? 1,
        sort: options?.sort,
      },
    };

    const response = await createRequest<APIKeyListResult>(config);
    return response.data;
  }

  async delete(key: string) {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/v1/keys/${key}`,
      headers: this.headers,
    };
    const response = await createRequest<APIKeyDeleteResult>(config);
    return response.data;
  }

  async get(key: string, options?: RequestOptions) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/v1/keys/${key}`,
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    };
    const response = await createRequest<APIKeyResult>(config);
    return response.data;
  }
}
