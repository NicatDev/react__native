import { pick } from "lodash";
import { ComponentProps } from "react";

import { FCComponentName } from "@/types/fc-component-name";

type NonCommonProps<TWebComponent extends FCComponentName, TNativeComponent extends FCComponentName> = Omit<
  ComponentProps<TWebComponent>,
  keyof ComponentProps<TNativeComponent>
>;

const baseProps = ["className", "contentClassName", "style", "value", "placeholder", "disabled"] as const;

// WIP: Hook to convert web props to native
export const useConvertWebPropsToNative = <
  TWebComponent extends FCComponentName,
  TNativeComponent extends FCComponentName
>(
  props: NonCommonProps<TWebComponent, TNativeComponent>,
  propsWhichWillBePassedWithoutValidation: (keyof NonCommonProps<TNativeComponent, TWebComponent>)[] = []
) => {
  return pick(props, [...baseProps, ...propsWhichWillBePassedWithoutValidation]) as Omit<
    ComponentProps<TNativeComponent>,
    `on${string}`
  >;
};
