import { FC, PropsWithChildren } from "react";

import { ExtendedFC } from "../../types/extended-fc";

export interface TableBaseProps {
  className?: string;
  stickyHeader?: boolean;
}

export interface TableCellProps extends TableBaseProps {
  fullRowSpan?: boolean;
}

interface TableHeaderCellProps extends TableBaseProps {
  name: string;
}

export interface TableHeaderExtends {
  Cell: FC<PropsWithChildren<TableHeaderCellProps>>;
}

export interface TableExtends {
  Header: ExtendedFC<PropsWithChildren<TableBaseProps>, TableHeaderExtends>;
  Body: FC<PropsWithChildren<TableBaseProps>>;
  Row: FC<PropsWithChildren<TableBaseProps>>;
  Cell: FC<PropsWithChildren<TableCellProps>>;
}
