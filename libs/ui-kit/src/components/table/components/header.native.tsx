import { PropsWithChildren } from "react";
import { View } from "react-native";

import { ExtendedFC } from "@/types/extended-fc";

import { cn } from "@/utils";

import { useHeader } from "../hooks/use-header";
import { useHeaderCell } from "../hooks/use-header-cell";
import { TableBaseProps, TableHeaderExtends } from "../table.types";

export const Header: ExtendedFC<PropsWithChildren<TableBaseProps>, TableHeaderExtends> = ({ className, children }) => {
  useHeader(children, Header);

  return (
    <View data-table-component="thead" className={className}>
      <View data-table-component="tr" className="flex flex-row">
        {children}
      </View>
    </View>
  );
};

Header.Cell = ({ className, name, children }) => {
  useHeaderCell(name);

  return (
    <View data-table-component="th" className={cn(className, "flex-1")}>
      {children}
    </View>
  );
};
