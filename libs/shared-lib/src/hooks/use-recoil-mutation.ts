import { RecoilState, useSetRecoilState } from "recoil";

import { DefaultError, QueryClient, UseMutationOptions, useMutation } from "@tanstack/react-query";

export function useRecoilMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
  TIsNullable extends boolean = false
>(
  atom: RecoilState<NoInfer<TIsNullable extends true ? TData | null : TData>>,
  options: UseMutationOptions<TData, TError, TVariables, TContext> & { isNullable?: TIsNullable },
  queryClient?: QueryClient
) {
  const setRecoilState = useSetRecoilState(atom);

  return useMutation(
    {
      ...options,
      onSuccess(data, ...otherOptions) {
        options.onSuccess?.(data, ...otherOptions);
        setRecoilState(data);
      }
    },
    queryClient
  );
}
