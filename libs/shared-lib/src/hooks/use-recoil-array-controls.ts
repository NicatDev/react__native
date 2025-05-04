import { type RecoilState, useRecoilState } from "recoil";

export const useRecoilArrayControls = <TData extends { id: string | number }>(atom: RecoilState<TData[]>) => {
  const [state, setState] = useRecoilState(atom);

  return {
    add(item: TData) {
      setState(prevArray => [...prevArray, item]);
    },
    addMany(items: TData[]) {
      setState(prevArray => [...prevArray, ...items]);
    },
    get(id: TData["id"]) {
      return state.find(item => item.id === id);
    },
    getMany(...ids: TData["id"][]) {
      return state.filter(item => ids.includes(item.id));
    },
    update(id: TData["id"], item: TData) {
      setState(prevArray =>
        prevArray.map(existingItem => (existingItem.id === id ? { ...existingItem, ...item } : existingItem))
      );
    },
    removeById(id: TData["id"]) {
      setState(prevArray => prevArray.filter(existingItem => existingItem.id !== id));
    },
    removeItem(item: TData) {
      setState(prevArray => prevArray.filter(existingItem => existingItem !== item));
    },
    clear() {
      setState([]);
    }
  };
};
