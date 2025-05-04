import { ReactNode } from "react";

import { useChildren } from "@/hooks/use-children";
import { ExtendedFC } from "@/types/extended-fc";

import { TableExtends } from "../table.types";

export const useTable = (children: ReactNode, Table: ExtendedFC<any, TableExtends>) => {
  const childNodes = useChildren(children, [Table.Header, Table.Body]);
  const headers = childNodes.filter(child => child.type === Table.Header);
  const bodies = childNodes.filter(child => child.type === Table.Body);

  if (headers.length > 1) throw new Error("Table can only have one Table.Header");
  const header = headers[0];
  if (bodies.length > 1) throw new Error("Table can only have one Table.Body");
  const body = bodies[0];

  return { header, body };
};
