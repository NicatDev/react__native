import { ForwardRefRenderFunction, forwardRef, useRef } from "react";

import { BlockProps } from "../block.types";
import { useScrollView } from "../hooks/use-scroll-view";
import { ScrollViewRef } from "./scroll-view.types";

const ScrollViewBase: ForwardRefRenderFunction<ScrollViewRef, BlockProps> = ({ children, ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollView(ref, {
    scrollToEnd() {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  });

  return (
    <div ref={containerRef} {...props}>
      {children}
    </div>
  );
};

export const ScrollView = forwardRef(ScrollViewBase);
