import { FC, PropsWithChildren } from "react";

import { WhenProps } from "./when.types";

export const When: FC<PropsWithChildren<WhenProps>> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};
