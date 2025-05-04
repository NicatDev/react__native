import { FC, PropsWithChildren } from "react";
import { View } from "react-native";

import { TableBaseProps } from "../table.types";

export const Body: FC<PropsWithChildren<TableBaseProps>> = ({ className, children }) => {
  return (
    <View data-table-component="tbody" className={className}>
      {children}
    </View>
  );
};
