import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "@/utils";

import { TableCellProps } from "../table.types";

export const Cell: FC<PropsWithChildren<TableCellProps>> = ({ fullRowSpan, className, children }) => {
  return (
    <View data-table-component="td" className={cn(className, { "flex-1": !fullRowSpan, "grow": fullRowSpan })}>
      {children}
    </View>
  );
};
