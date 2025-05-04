import { FC, PropsWithChildren } from "react";

export interface IfProps {
  condition: boolean;
}

export interface IfExtends {
  Then: FC<PropsWithChildren>;
  ElseIf: FC<PropsWithChildren<IfProps>>;
  Else: FC<PropsWithChildren>;
}
