import { ListResultMetadata } from '../../types';

export interface Template {
  tags: string[];
  created_at: string;
  updated_at: string;
  name: string;
  recipient_aliases: {
    alias_id: string;
    description: string;
    action: string;
  }[];
  public_id: string;
}

export interface TemplateListResult {
  meta: ListResultMetadata;
  data: Template[];
}

export interface TemplateResult {
  meta: ListResultMetadata;
  data: Template;
}

export interface TemplateDeleteResult {
  id: string;
}

export class RequestMessage {
  subject: string;

  body?: string;
}

export class TemplateRecipient {
  id: string;

  name: string;

  email: string;

  access_code?: string;

  private_message?: string;
}

export interface TemplateTransformRequest {
  expiration?: string;

  message?: RequestMessage;

  recipients: TemplateRecipient[];
}
