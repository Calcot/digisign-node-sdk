import { createRequest, DSFactory } from '../factory';
import { APIKeyDeleteResult, APIKeyListResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

export class Keys {
  readonly headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }
  async list() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/keys',
      headers: this.headers,
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
}
