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
