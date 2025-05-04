import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";

import { useConvertClassnameToHex } from "./hooks/use-convert-classname-to-hex";
import { LinearGradientProps } from "./linear-gradient.types";

const InternalLinearGradient = cssInterop(ExpoLinearGradient, { className: "style" });
export type LinearGradientRef = ExpoLinearGradient;

const LinearGradientBase: ForwardRefRenderFunction<ExpoLinearGradient, PropsWithChildren<LinearGradientProps>> = (
  { from, via, to, className, sideTo = "r", children },
  ref
) => {
  const convert = useConvertClassnameToHex();
  const colors = [from && convert(from), via && convert(via), to && convert(to)].filter(Boolean) as [string, string];
  const start = { x: sideTo.includes("r") ? 0 : 1, y: sideTo.includes("b") ? 0 : 1 };
  const end = { x: sideTo.includes("l") ? 0 : 1, y: sideTo.includes("t") ? 0 : 1 };

  return (
    <InternalLinearGradient {...{ ref }} className={className} colors={colors} start={start} end={end}>
      {children}
    </InternalLinearGradient>
  );
};

export const LinearGradient = forwardRef(LinearGradientBase);
