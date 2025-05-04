import { FC } from "react";
import { Text, View } from "react-native";

import { uppercase } from "@digitask/shared-lib";
import { Icon } from "@mdreal/ui-kit";

import { palette } from "../../../../../../palette";
import type { TagProps } from "./tag.types";

export const Tag: FC<TagProps> = ({ tag, icon }) => {
  return (
    <View className="bg-secondary flex flex-row items-center gap-2 rounded-2xl p-2">
      <Icon name={icon} variables={{ fill: palette.neutral["40"], stroke: palette.neutral["40"] }} />
      <Text className="text-gray-500">{uppercase(tag)}</Text>
    </View>
  );
};
