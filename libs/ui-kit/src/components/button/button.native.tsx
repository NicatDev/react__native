import { cssInterop } from "nativewind";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { ActivityIndicator, TouchableOpacity as RNTouchableOpacity, View } from "react-native";

import { useConvertWebPropsToNative } from "@/hooks/use-convert-web-props-to-native";
import { Variants } from "@/types/variant";

import { useEventHandlers } from "../../hooks/event-handler/use-event-handlers";
import { useProps } from "../../hooks/event-handler/use-props";
import { If } from "../if";
import { ButtonProps } from "./button.types";
import { getClassNames } from "./button.utils";

export const TouchableOpacity = cssInterop(RNTouchableOpacity, { className: "style" });
const RNActivityIndicator = cssInterop(ActivityIndicator, {
  className: { target: false, nativeStyleToProp: { backgroundColor: "color" } }
});

export type ButtonRef = View;
const ButtonBase: ForwardRefRenderFunction<ButtonRef, ButtonProps> = (
  { children, variant = Variants.Primary, isLoading = false, ...props },
  ref
) => {
  const { props: baseProps, handlers } = useProps(props);
  const eventHandler = useEventHandlers(handlers, {});
  const nativeProps = useConvertWebPropsToNative<"button", typeof TouchableOpacity>(baseProps);

  return (
    <TouchableOpacity
      ref={ref}
      {...nativeProps}
      {...eventHandler.nativeEventHandlers}
      className={getClassNames(variant, nativeProps.className)}
    >
      <If condition={isLoading}>
        <If.Then>
          <RNActivityIndicator className="bg-red-500" size="small" />
        </If.Then>

        <If.Else>{children}</If.Else>
      </If>
    </TouchableOpacity>
  );
};

export const Button = forwardRef(ButtonBase);
