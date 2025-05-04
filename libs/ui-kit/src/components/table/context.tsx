import { FC, PropsWithChildren, createContext, useContext, useState } from "react";

export interface TableContext {
  stickyHeader: boolean;
  keys: string[];
  registerKey(key: string): void;
}

export const TableContext = createContext<TableContext | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export const TableProvider: FC<PropsWithChildren<Pick<TableContext, "stickyHeader">>> = ({
  stickyHeader = false,
  children
}) => {
  const [keys, setKeys] = useState<string[]>([]);
  const registerKey = (key: string) => {
    setKeys(prevKeys => [...prevKeys, key]);
  };

  return <TableContext.Provider value={{ stickyHeader, keys, registerKey }}>{children}</TableContext.Provider>;
};
