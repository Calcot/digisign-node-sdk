import { ListResultMetadata } from '../../types';

interface RequestDocument {
  url: string;
  mimetype: string;
  public_id: string;
  created_at: string;
  updated_at: string;
}

export interface Request {
  status: string;
  expiration: string | null;
  message: {
    subject: string;
    body: string | null;
  };
  tags: string[];
  public_id: string;
  created_at: string;
  updated_at: string;
  documents: RequestDocument[];
}

export interface RequestListResult {
  meta: ListResultMetadata;
  data: Request[];
}

export interface RequestResult {
  meta: ListResultMetadata;
  data: Request;
}
