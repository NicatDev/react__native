import { RecoilState, RecoilValue, Snapshot, useRecoilCallback, useRecoilSnapshot } from "recoil";

let __snapshot: Snapshot = null as any;
let __set: <T>(recoilState: RecoilState<T>, valOrUpdater: ((currVal: T) => T) | T) => void = null as any;

export const recoilExternals = {
  set<TData>(recoilState: RecoilState<TData>, valOrUpdater: ((currVal: TData) => TData) | TData) {
    __set(recoilState, valOrUpdater);
  },
  getLoadable<TData>(recoilState: RecoilValue<TData>) {
    return __snapshot.getLoadable(recoilState);
  }
};

export function RecoilUtils() {
  __snapshot = useRecoilSnapshot();

  useRecoilCallback(({ set }) => {
    __set = set;
    return async () => {};
  })();

  return <></>;
}
