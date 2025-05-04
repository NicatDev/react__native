import { cssInterop } from "nativewind";
import { ForwardRefRenderFunction, forwardRef, useRef } from "react";
import { ScrollView as RNScrollView } from "react-native";

import { useConvertWebPropsToNative } from "@/hooks/use-convert-web-props-to-native";

import { BlockProps } from "../block.types";
import { useScrollView } from "../hooks/use-scroll-view";
import { ScrollViewBaseProps, ScrollViewRef } from "./scroll-view.types";
import { scrollVIewConvertedProps } from "./scroll-view.utils";

const RNInternalScrollView = cssInterop(RNScrollView, {
  className: "style",
  contentClassName: "contentContainerStyle"
});

const ScrollViewBase: ForwardRefRenderFunction<ScrollViewRef, BlockProps & ScrollViewBaseProps> = (
  { children, ...props },
  ref
) => {
  const containerRef = useRef<RNScrollView>(null);

  useScrollView(ref, {
    scrollToEnd() {
      if (!containerRef.current) return;
      containerRef.current.scrollTo({ y: containerRef.current.getScrollableNode().scrollHeight, animated: true });
    }
  });

  const nativeProps = useConvertWebPropsToNative<"div", typeof RNInternalScrollView>(props, scrollVIewConvertedProps);
  return (
    <RNInternalScrollView {...{ ref: containerRef }} {...nativeProps}>
      {children}
    </RNInternalScrollView>
  );
};

export const ScrollView = forwardRef(ScrollViewBase);
