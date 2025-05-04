import { PropsWithChildren } from "react";

import { ExtendedFC } from "@/types/extended-fc";

import { cn } from "../../utils";
import { Block } from "../block/block.native";
import { Body, Cell, Header, Row } from "./components/index.native";
import { TableProvider } from "./context";
import { useTable } from "./hooks/use-table";
import { TableBaseProps, TableExtends } from "./table.types";

export const Table: ExtendedFC<PropsWithChildren<TableBaseProps>, TableExtends> = ({
  className,
  stickyHeader = false,
  children
}) => {
  const { header, body } = useTable(children, Table);

  return (
    <TableProvider stickyHeader={stickyHeader}>
      <Block.Scroll stickyHeaderIndices={stickyHeader ? [1] : undefined}>
        {header}

        <Block className={cn(className, "flex")}>{body}</Block>
      </Block.Scroll>
    </TableProvider>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
