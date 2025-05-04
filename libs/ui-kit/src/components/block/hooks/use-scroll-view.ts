import { ForwardedRef, useImperativeHandle } from "react";

import { ScrollViewRef } from "../components/scroll-view.types";

export const useScrollView = (ref: ForwardedRef<ScrollViewRef>, handlers: ScrollViewRef) => {
  useImperativeHandle(ref, () => handlers);
};
