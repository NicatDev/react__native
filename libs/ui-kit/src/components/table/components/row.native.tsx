import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { cn } from "@/utils";

import { useRow } from "../hooks/use-row";
import { TableBaseProps } from "../table.types";
import { Cell } from "./cell.native";

export const Row: FC<PropsWithChildren<TableBaseProps>> = ({ className, children }) => {
  useRow(children, [Cell]);
  return (
    <View data-table-component="tr" className={cn(className, "flex flex-row")}>
      {children}
    </View>
  );
};
