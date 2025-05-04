import { WithPaginationDefaults } from "../../types/with/pagination-defaults";

export const withPaginationDefaults = <TData>(defaultValue: TData[]): WithPaginationDefaults<TData> => ({
  count: 0,
  next: null,
  previous: null,
  results: defaultValue
});
