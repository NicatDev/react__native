export interface PaginatedResponse<TData = any> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData[];
}
