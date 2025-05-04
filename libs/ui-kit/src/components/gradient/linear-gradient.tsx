import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";

import { cn } from "../../utils";
import { LinearGradientProps } from "./linear-gradient.types";

export type LinearGradientRef = HTMLDivElement;
const LinearGradientBase: ForwardRefRenderFunction<LinearGradientRef, PropsWithChildren<LinearGradientProps>> = (
  { from, via, to, sideTo, children },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn(`bg-gradient-to-${sideTo}`, from && `from-${from}`, via && `via-${via}`, to && `to-${to}`)}
    >
      {children}
    </div>
  );
};

export const LinearGradient = forwardRef(LinearGradientBase);
