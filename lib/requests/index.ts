import { DSFactory } from '../factory';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../types';
import { APIDefinition } from '../utils/definitions';
import { createRequest, getURI } from '../utils/fn';
import { RequestListResult, RequestResult } from './types';

export class Requests extends APIDefinition {
  headers: AxiosHeaders;
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
    const config: AxiosRequestConfig = this.extendConfig({
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
    });
    const response = await createRequest<RequestListResult>(config);
    return response.data;
  }

  async get(id: string, options?: RequestOptions) {
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'GET',
      url: `/v1/requests/${id}`,
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    });
    const response = await createRequest<RequestResult>(config);
    return response.data;
  }
}
