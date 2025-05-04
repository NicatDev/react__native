import { Children, FC, ReactElement } from "react";

import { useChildren } from "../../hooks/use-children";
import { Case } from "./components/case";
import { Default } from "./components/default";
import { SwitchProps } from "./switch.types";

export const Switch = <TVariable extends string | number | boolean>({
  var: variable,
  children
}: SwitchProps<TVariable>): ReturnType<FC> => {
  const childrenArray = Children.toArray(children);
  const childArray = useChildren(childrenArray, [Case, Default]) as ReactElement[];

  if (childArray.length === 0) return null;
  const defaultChildren = childArray.filter(child => child.type === Default);
  if (defaultChildren.length > 1) throw new Error("Switch component can only have one Default component");
  if (defaultChildren.length > 0 && childrenArray.at(-1) !== defaultChildren[0])
    throw new Error("Default component should be at the end of the Switch component children");

  for (const child of childArray) {
    if (child.type === Case && child.props.value === variable) {
      return child;
    }

    if (child.type === Default) {
      return child;
    }
  }

  return null;
};

Switch.Case = Case;
Switch.Default = Default;
