import type { FC, ForwardRefExoticComponent, PropsWithoutRef, ReactElement, RefAttributes } from "react";

import { BaseProps } from "../../types/base-props";
import { FadeViewProps } from "./components/fade-view.types";
import { ScrollViewBaseProps, ScrollViewRef } from "./components/scroll-view.types";

export type BlockProps = BaseProps<"div"> & {
  refreshControl?: ReactElement;
};

export interface BlockExtends {
  Scroll: ForwardRefExoticComponent<PropsWithoutRef<BlockProps & ScrollViewBaseProps> & RefAttributes<ScrollViewRef>>;
  Fade: FC<BlockProps & FadeViewProps>;
}
