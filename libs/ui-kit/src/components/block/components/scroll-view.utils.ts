import { ComponentProps } from "react";
import type { ScrollView as RNScrollView } from "react-native";

export const scrollVIewConvertedProps = [
  "horizontal",
  "showsHorizontalScrollIndicator",
  "stickyHeaderIndices",
  "refreshControl"
] as const satisfies (keyof ComponentProps<typeof RNScrollView>)[];
