import { ListResultMetadata } from '../../types';

export interface Workspace {
  name: string;
  created_at: string;
  updated_at: string;
  public_id: string;
}

export interface WorkspaceListResult {
  meta: ListResultMetadata;
  data: Workspace[];
}

export interface WorkspaceWhereResult {
  meta: ListResultMetadata;
  data: Workspace;
}
