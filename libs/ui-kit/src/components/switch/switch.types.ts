import { PropsWithChildren, ReactElement } from "react";

import { SwitchCaseProps } from "./components/case.types";

export interface SwitchProps<TVariable> {
  var: TVariable;
  children:
    | ReactElement<SwitchCaseProps<TVariable>>[]
    | [...ReactElement<SwitchCaseProps<TVariable>>[], ReactElement<PropsWithChildren>];
}
