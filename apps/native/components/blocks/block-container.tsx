import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";

import { Block, BlockRef, LinearGradient, LinearGradientRef, cn } from "@mdreal/ui-kit";

import { BlockContainerProps } from "./block-container.types";

const BlockContainerBase: ForwardRefRenderFunction<
  BlockRef | LinearGradientRef,
  PropsWithChildren<BlockContainerProps>
> = ({ className, gradient, children }, ref) => {
  return gradient ? (
    <LinearGradient ref={ref} className={className} {...gradient}>
      {children}
    </LinearGradient>
  ) : (
    <Block ref={ref} className={cn("rounded-2xl bg-white p-4", className)}>
      {children}
    </Block>
  );
};

export const BlockContainer = forwardRef(BlockContainerBase);
