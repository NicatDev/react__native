import { FC } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { cn } from "../../../utils";
import { BlockProps } from "../block.types";
import { FadeViewProps } from "./fade-view.types";

export const FadeView: FC<BlockProps & FadeViewProps> = ({ children, className }) => {
  return (
    <View className={cn("flex-1 bg-white")}>
      <Animated.View className={cn("flex-1", className)} entering={FadeIn} exiting={FadeOut}>
        {children}
      </Animated.View>
    </View>
  );
};
