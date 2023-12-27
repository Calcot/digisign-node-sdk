import { DSFactory } from '../factory';
import { APIKeyDeleteResult, APIKeyListResult, APIKeyResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../types';
import { createRequest, getURI } from '../utils/fn';
import { APIDefinition } from '../utils/definitions';

export class Keys extends APIDefinition {
  readonly headers: AxiosHeaders;
  protected readonly baseConfig: AxiosRequestConfig;
  constructor(private readonly DSFactory: DSFactory) {
    super();
    this.headers = DSFactory.headers;
    this.baseConfig = {
      baseURL: getURI(DSFactory.env),
    };
  }

  protected extendConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return Object.assign({}, this.baseConfig, config);
  };
  async list(options?: RequestOptions) {
    const config: AxiosRequestConfig = this.extendConfig({
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
    });

    const response = await createRequest<APIKeyListResult>(config);
    return response.data;
  }

  async delete(key: string) {
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'DELETE',
      url: `/v1/keys/${key}`,
      headers: this.headers,
    });
    const response = await createRequest<APIKeyDeleteResult>(config);
    return response.data;
  }

  async get(key: string, options?: RequestOptions) {
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'GET',
      url: `/v1/keys/${key}`,
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    });
    const response = await createRequest<APIKeyResult>(config);
    return response.data;
  }
}
