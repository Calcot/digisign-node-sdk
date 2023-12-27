import { createRequest, DSFactory } from '../factory';
import {
  CreateWebhook,
  WebhookDeleteResult,
  WebhookListResult,
  WebhookResult,
} from './types';
import { AxiosHeaders, AxiosRequestConfig } from 'axios';

export class Webhooks {
  headers: AxiosHeaders;
  constructor(private readonly DSFactory: DSFactory) {
    this.headers = DSFactory.headers;
  }

  workspace(workspaceId: string) {
    const headers = this.addWSIdentifier(workspaceId);
    const webhooks = new Webhooks(this.DSFactory);
    webhooks.headers = headers;
    return webhooks;
  }

  private addWSIdentifier(wsIdentifier: string) {
    const headers = new AxiosHeaders(this.headers.toJSON());
    headers.set('X-WS-Identifier', wsIdentifier);
    return headers;
  }
  async list() {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/v1/webhooks',
      headers: this.headers,
    };
    const response = await createRequest<WebhookListResult>(config);
    return response.data;
  }

  async delete(id: string) {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/v1/webhooks/${id}`,
      headers: this.headers,
    };
    const response = await createRequest<WebhookDeleteResult>(config);
    return response.data;
  }

  async get(id: string) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/v1/webhooks/${id}`,
      headers: this.headers,
    };
    const response = await createRequest<WebhookResult>(config);
    return response.data;
  }

  async rotateKey(id: string) {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `/v1/webhooks/${id}/rotate-key`,
      headers: this.headers,
    };
    const response = await createRequest<WebhookResult>(config);
    return response.data;
  }

  async update(
    id: string,
    payload: Partial<CreateWebhook>,
    params: Record<string, any> = {},
  ) {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `/v1/webhooks/${id}`,
      headers: this.headers,
      params,
      data: payload,
    };
    const response = await createRequest<WebhookResult>(config);
    return response.data;
  }

  async create(payload: CreateWebhook, params: Record<string, any> = {}) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `/v1/webhooks`,
      headers: this.headers,
      params,
      data: payload,
    };
    const response = await createRequest<WebhookResult>(config);
    return response.data;
  }
}
