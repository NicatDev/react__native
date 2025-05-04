import { ComponentProps } from "react";
import { ScrollView as RNScrollView } from "react-native";

import { scrollVIewConvertedProps } from "./scroll-view.utils";

export type ScrollViewConvertedProps = (typeof scrollVIewConvertedProps)[number];

export interface ScrollViewBaseProps extends Pick<ComponentProps<typeof RNScrollView>, ScrollViewConvertedProps> {
  contentClassName?: string;
}

export interface ScrollViewRef {
  scrollToEnd: () => void;
}
