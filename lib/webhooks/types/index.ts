import { ListResultMetadata } from '../../types';

export enum WebhookStatus {
  active = 'active',
  inactive = 'inactive',
}

export enum WebhookEventType {
  DOCUMENT_VIEWED = 'document.viewed',
  DOCUMENT_SIGNED = 'document.signed',
  DOCUMENT_REJECTED = 'document.rejected',
  DOCUMENT_COMPLETED = 'document.completed',
}

export interface Webhook {
  endpoint_url: string;
  event_types: string[];
  status: WebhookStatus;
  public_id: string;
  signing_token: string;
  created_at: string;
  updated_at: string;
}

export interface WebhookListResult {
  meta: ListResultMetadata;
  data: Webhook[];
}

export interface WebhookResult {
  meta: ListResultMetadata;
  data: Webhook;
}

export interface WebhookDeleteResult {
  id: string;
}

export interface CreateWebhook {
  endpoint_url: string;
  event_types: WebhookEventType[]
}
