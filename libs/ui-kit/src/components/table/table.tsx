import { PropsWithChildren } from "react";

import { ExtendedFC } from "@/types/extended-fc";

import { Body, Cell, Header, Row } from "./components";
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
      <table className={className}>
        {header}
        {body}
      </table>
    </TableProvider>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
