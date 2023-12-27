import { DSFactory } from '../factory';
import {
  TemplateListResult,
  TemplateResult,
  TemplateTransformRequest,
} from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';
import { isDateString } from 'class-validator';
import { DigiError } from '../error';
import { RequestOptions } from '../types';
import { createRequest, getURI } from '../utils/fn';

export class Templates {
  headers: AxiosHeaders;
  baseConfig: AxiosRequestConfig;
  constructor(private readonly DSFactory: DSFactory) {
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
    const ws = new Templates(this.DSFactory);
    ws.headers = headers;
    return ws;
  }

  private addWSIdentifier(wsIdentifier: string) {
    const headers = new AxiosHeaders(this.headers.toJSON());
    headers.set('X-WS-Identifier', wsIdentifier);
    return headers;
  }
  async list(options?: RequestOptions) {
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'GET',
      url: '/v1/templates',
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
        per_page: options?.limit ?? 10,
        page: options?.page ?? 1,
        sort: options?.sort,
      },
    });
    const response = await createRequest<TemplateListResult>(config);
    return response.data;
  }

  async get(id: string, options?: RequestOptions) {
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'GET',
      url: `/v1/templates/${id}`,
      headers: this.headers,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    });
    const response = await createRequest<TemplateResult>(config);
    return response.data;
  }

  async transform(
    id: string,
    payload: TemplateTransformRequest,
    options?: RequestOptions,
  ) {
    this.validateTransform(payload);
    const config: AxiosRequestConfig = this.extendConfig({
      method: 'PUT',
      url: `/v1/templates/${id}/transform`,
      headers: this.headers,
      data: payload,
      params: {
        population: JSON.stringify(options?.population ?? []),
        filter: JSON.stringify(options?.filter ?? []),
      },
    });
    const response = await createRequest<TemplateResult>(config);
    return response.data;
  }

  private validateTransform(payload: TemplateTransformRequest) {
    if (payload.expiration && !isDateString(payload.expiration)) {
      throw new DigiError('404', 'Expiration requires a date string.');
    }
  }
}
