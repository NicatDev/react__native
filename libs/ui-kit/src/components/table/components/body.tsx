import { FC, PropsWithChildren } from "react";

import { TableBaseProps } from "../table.types";

export const Body: FC<PropsWithChildren<TableBaseProps>> = ({ className, children }) => {
  return <tbody className={className}>{children}</tbody>;
};
