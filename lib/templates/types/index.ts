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
