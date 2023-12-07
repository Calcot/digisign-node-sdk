import { createRequest, DSFactory } from '../factory';
import { WorkspaceListResult, WorkspaceWhereResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

export class Workspaces {
  readonly headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }
  async list() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/workspaces',
      headers: this.headers,
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
