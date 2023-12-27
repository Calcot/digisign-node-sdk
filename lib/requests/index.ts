import { createRequest, DSFactory } from '../factory';
import { RequestListResult, RequestResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../types';

export class Requests {
  headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }

  workspace(workspaceId: string) {
    const headers = this.addWSIdentifier(workspaceId);
    const webhooks = new Requests(this.DSFactory);
    webhooks.headers = headers;
    return webhooks;
  }

  private addWSIdentifier(wsIdentifier: string) {
    const headers = new AxiosHeaders(this.headers.toJSON());
    headers.set('X-WS-Identifier', wsIdentifier);
    return headers;
  }
  async list(options?: RequestOptions) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/requests',
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
        per_page: options?.limit ?? 10,
        page: options?.page ?? 1,
        sort: options?.sort,
      },
    };
    const response = await createRequest<RequestListResult>(config);
    return response.data;
  }

  async get(id: string, options?: RequestOptions) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/v1/requests/${id}`,
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    };
    const response = await createRequest<RequestResult>(config);
    return response.data;
  }
}
