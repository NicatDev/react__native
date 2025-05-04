import { ForwardRefRenderFunction, PropsWithChildren } from "react";

import { extendedForwardRef } from "@/types/extended-fc";

import { BlockExtends, BlockProps } from "./block.types";
import { FadeView } from "./components/fade-view";
import { ScrollView } from "./components/scroll-view";

export type BlockRef = HTMLDivElement;
const BlockBase: ForwardRefRenderFunction<BlockRef, PropsWithChildren<BlockProps>> = ({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
);

export const Block = extendedForwardRef<BlockRef, PropsWithChildren<BlockProps>, BlockExtends>(BlockBase);
Block.Scroll = ScrollView;
Block.Fade = FadeView;
