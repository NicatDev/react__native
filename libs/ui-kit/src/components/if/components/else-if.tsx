import { FC, PropsWithChildren } from "react";

import { IfProps } from "../if.types";

export const ElseIf: FC<PropsWithChildren<IfProps>> = ({ children }) => {
  return <>{children}</>;
};
