import { useEffect } from "react";
import { RecoilState, useSetRecoilState } from "recoil";

import { DefaultError, QueryClient, QueryKey, UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";

export function useRecoilQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TIsNullable extends boolean = false
>(
  recoilState: RecoilState<TIsNullable extends true ? NoInfer<TData> | null : NoInfer<TData>>,
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & { isNullable?: TIsNullable },
  queryClient?: QueryClient
): UseQueryResult<TData, TError> {
  const setRecoilState = useSetRecoilState(recoilState);
  const query = useQuery(options, queryClient);

  useEffect(() => {
    if (query.data) {
      setRecoilState(query.data);
    }
  }, [query.data]);

  return query;
}
