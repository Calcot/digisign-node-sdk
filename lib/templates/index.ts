import { createRequest, DSFactory } from '../factory';
import { TemplateListResult, TemplateResult } from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

export class Templates {
  readonly headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }

  private addWSIdentifier(wsIdentifier: string) {
    const headers = new AxiosHeaders(this.headers.toJSON());
    headers.set('X-WS-Identifier', wsIdentifier);
    return headers;
  }
  async list(workspaceId: string) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/templates',
      headers: this.addWSIdentifier(workspaceId),
    };
    const response = await createRequest<TemplateListResult>(config);
    return response.data;
  }

  async get(workspaceId: string, id: string) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/v1/templates/${id}`,
      headers: this.addWSIdentifier(workspaceId),
    };
    const response = await createRequest<TemplateResult>(config);
    return response.data;
  }
}
