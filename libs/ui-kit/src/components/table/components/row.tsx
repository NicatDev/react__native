import { FC, PropsWithChildren } from "react";

import { useRow } from "../hooks/use-row";
import { TableBaseProps } from "../table.types";
import { Cell } from "./cell";

export const Row: FC<PropsWithChildren<TableBaseProps>> = ({ children }) => {
  useRow(children, [Cell]);
  return <tr>{children}</tr>;
};
