export interface PaginationResult {
  total: number;
  current: number;
  next: number;
  prev: number;
  per_page: number;
}
export interface ListResultMetadata {
  code: number;
  pagination?: PaginationResult;
}

export interface RequestOptions {
  population?: string;
  filter?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string | number | Record<string, any>;
}
