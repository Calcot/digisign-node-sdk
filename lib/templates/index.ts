import { createRequest, DSFactory } from '../factory';
import {
  TemplateListResult,
  TemplateResult,
  TemplateTransformRequest,
} from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { isDateString } from 'class-validator';
import { DigiError } from '../error';

export class Templates {
  headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }

  workspace(workspaceId: string) {
    const headers = this.addWSIdentifier(workspaceId);
    const ws = new Templates(this.DSFactory);
    ws.headers = headers;
    return ws;
  }

  private addWSIdentifier(wsIdentifier: string) {
    const headers = new AxiosHeaders(this.headers.toJSON());
    headers.set('X-WS-Identifier', wsIdentifier);
    return headers;
  }
  async list() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/templates',
      headers: this.headers,
    };
    const response = await createRequest<TemplateListResult>(config);
    return response.data;
  }

  async get(id: string) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/v1/templates/${id}`,
      headers: this.headers,
    };
    const response = await createRequest<TemplateResult>(config);
    return response.data;
  }

  async transform(id: string, payload: TemplateTransformRequest) {
    this.validateTransform(payload);
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `/v1/templates/${id}/transform`,
      headers: this.headers,
      data: payload,
    };
    const response = await createRequest<TemplateResult>(config);
    return response.data;
  }

  private validateTransform(payload: TemplateTransformRequest) {
    if (payload.expiration && !isDateString(payload.expiration)) {
      throw new DigiError('404', 'Expiration requires a date string.');
    }
  }
}
