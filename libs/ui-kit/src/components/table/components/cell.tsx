import { FC, PropsWithChildren } from "react";

import { useCell } from "../hooks/use-cell";
import { TableCellProps } from "../table.types";

export const Cell: FC<PropsWithChildren<TableCellProps>> = ({ fullRowSpan, children }) => {
  const { keys } = useCell();
  return <td rowSpan={fullRowSpan ? keys.keys.length : undefined}>{children}</td>;
};
