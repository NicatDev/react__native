import { useEffect } from "react";

import { useTableContext } from "../context";

export const useHeaderCell = (name: string) => {
  const tableCtx = useTableContext();

  useEffect(() => {
    tableCtx.registerKey(name);
  }, []);
};
