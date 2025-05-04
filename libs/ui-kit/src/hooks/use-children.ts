import { Children, FC, type ReactElement, ReactNode } from "react";

export const useChildren = <TChildProps>(children: ReactNode, childTypes: FC<any>[]): ReactElement<TChildProps>[] => {
  return Children.toArray(children).filter(child => {
    if (!child) return false;
    if (typeof child === "string" || typeof child === "number") return false;
    if (!("type" in child)) return false;
    if (Array.isArray(child)) return false;
    return childTypes.some(type => child?.type === type);
  }) as ReactElement<TChildProps>[];
};
