import { type RecoilState, useRecoilValue } from "recoil";

import { useRecoilArrayControls } from "./use-recoil-array-controls";

export const useRecoilArray = <TData extends { id: string | number }>(atom: RecoilState<TData[]>) => {
  const state = useRecoilValue<TData[]>(atom);
  const controls = useRecoilArrayControls(atom);
  return [state, controls] as const;
};
