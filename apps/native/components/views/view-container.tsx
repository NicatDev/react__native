import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";
import { View } from "react-native";

import { cn } from "@mdreal/ui-kit";

import { ViewContainerProps } from "./view-container.types";

const ViewContainerBase: ForwardRefRenderFunction<View, PropsWithChildren<ViewContainerProps>> = (
  { className, children },
  ref
) => {
  return (
    <View ref={ref} className={cn("rounded-2xl bg-white p-4", className)}>
      {children}
    </View>
  );
};

export const ViewContainer = forwardRef(ViewContainerBase);
