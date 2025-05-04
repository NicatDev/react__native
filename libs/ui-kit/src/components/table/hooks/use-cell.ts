import { useTableContext } from "../context";

export const useCell = () => {
  const tableCtx = useTableContext();
  return { keys: tableCtx.keys };
};
