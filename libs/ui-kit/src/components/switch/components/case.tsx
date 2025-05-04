import { FC, PropsWithChildren } from "react";

import { SwitchCaseProps } from "./case.types";

export const Case = <TVariable extends string | number | boolean>({
  children
}: PropsWithChildren<SwitchCaseProps<TVariable>>): ReturnType<FC> => {
  return <>{children}</>;
};
