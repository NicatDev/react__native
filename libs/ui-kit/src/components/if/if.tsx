import { Children, PropsWithChildren, ReactElement } from "react";

import { useChildren } from "../../hooks/use-children";
import { ExtendedFC } from "../../types/extended-fc";
import { Else } from "./components/else";
import { ElseIf } from "./components/else-if";
import { Then } from "./components/then";
import { IfExtends, IfProps } from "./if.types";

export const If: ExtendedFC<PropsWithChildren<IfProps>, IfExtends> = ({ condition, children }) => {
  const childrenArray = Children.toArray(children);

  const childArray = useChildren(childrenArray, [Then, ElseIf, Else]) as ReactElement[];
  if (!childArray) return null;
  if (childArray.length === 0) return null;
  if (childArray.length !== Children.count(children))
    throw new Error("If component can only contain If.Then, If.ElseIf or If.Else components");

  const thenComponents = childArray.filter(child => child.type === Then);
  if (thenComponents.length > 1) throw new Error("If component can only contain one If.Then component");
  const elseComponents = childArray.filter(child => child.type === Else);
  if (elseComponents.length > 1) throw new Error("If component can only contain one If.Else component");
  if (childArray.at(0)?.type !== Then) throw new Error("If component must start with If.Then component");
  if (elseComponents.length === 1 && childArray.at(-1)?.type !== Else)
    throw new Error("If component must end with If.Else component");

  for (let i = 0; i < childArray.length; i++) {
    if (childArray[i].type === Then && condition) {
      return childArray[i];
    } else if (childArray[i].type === ElseIf && childArray[i].props.condition) {
      return childArray[i];
    } else if (childArray[i].type === Else) {
      return childArray[i];
    }
  }

  return null;
};

If.Then = Then;
If.ElseIf = ElseIf;
If.Else = Else;
