import { Children, ReactNode } from "react";

import { useChildren } from "@/hooks/use-children";
import { ExtendedFC } from "@/types/extended-fc";

import { TableHeaderExtends } from "../table.types";

export const useHeader = (children: ReactNode, Header: ExtendedFC<any, TableHeaderExtends>) => {
  const childNodes = useChildren(children, [Header.Cell]);
  if (!childNodes) throw new Error("Table.Header must have at least one Table.Header.Cell");
  if (childNodes.length !== Children.count(children))
    throw new Error("Table.Header can only have Table.Header.Cell as children");
};
