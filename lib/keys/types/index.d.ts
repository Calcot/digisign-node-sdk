import { ListResultMetadata } from '../../types';

export interface APIKey {
  name: string;
  redacted_token: string;
  permissions: string[];
  public_id: string;
  created_at: string;
  updated_at: string;
}

export interface APIKeyListResult {
  meta: ListResultMetadata;
  data: APIKey[];
}

export interface APIKeyDeleteResult {
  id: string;
}
