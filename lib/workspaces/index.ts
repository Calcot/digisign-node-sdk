import { createRequest, DSFactory } from '../factory';
import { WorkspaceListResult, WorkspaceWhereResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { RequestOptions } from '../types';

export class Workspaces {
  readonly headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }
  async list(options?: RequestOptions) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/workspaces',
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
        per_page: options?.limit ?? 10,
        page: options?.page ?? 1,
        sort: options?.sort,
      },
    };
    const response = await createRequest<WorkspaceListResult>(config);
    return response.data;
  }

  async get(id: string) {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/v1/workspaces/${id}`,
      headers: this.headers,
    };
    const response = await createRequest<WorkspaceWhereResult>(config);
    return response.data;
  }
}
