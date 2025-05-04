interface Pagination {
  page: number;
  size: number;
}

export type WithPagination<T> = T & Partial<Pagination>;
