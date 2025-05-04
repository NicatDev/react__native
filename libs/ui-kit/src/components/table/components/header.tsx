import { PropsWithChildren } from "react";

import { ExtendedFC } from "@/types/extended-fc";

import { useHeader } from "../hooks/use-header";
import { useHeaderCell } from "../hooks/use-header-cell";
import { TableBaseProps, TableHeaderExtends } from "../table.types";

export const Header: ExtendedFC<PropsWithChildren<TableBaseProps>, TableHeaderExtends> = ({ className, children }) => {
  useHeader(children, Header);

  return (
    <thead className={className}>
      <tr>{children}</tr>
    </thead>
  );
};

Header.Cell = ({ className, name, children }) => {
  useHeaderCell(name);

  return <th className={className}>{children}</th>;
};
