import { ComponentProps, ForwardRefRenderFunction, PropsWithChildren } from "react";
import { View } from "react-native";

import { extendedForwardRef } from "../../types/extended-fc";
import { cn } from "../../utils";
import { BlockExtends } from "./block.types";
import { FadeView } from "./components/fade-view.native";
import { ScrollView } from "./components/scroll-view.native";

export type BlockRef = View;
const BlockBase: ForwardRefRenderFunction<BlockRef, PropsWithChildren<ComponentProps<typeof View>>> = (
  { children, className, ...props },
  ref
) => (
  <View ref={ref} className={cn("w-full", className)} {...props}>
    {children}
  </View>
);

export const Block = extendedForwardRef<BlockRef, PropsWithChildren<ComponentProps<typeof View>>, BlockExtends>(
  BlockBase
);
Block.Scroll = ScrollView;
Block.Fade = FadeView;
