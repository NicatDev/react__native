import { Children, FC, ReactNode } from "react";

import { useChildren } from "@/hooks/use-children";

export const useRow = (children: ReactNode, components: FC<any>[]) => {
  const childNodes = useChildren(children, components);
  if (childNodes.length !== Children.count(children)) throw new Error("Table.Row can only have Table.Cell as children");
};
