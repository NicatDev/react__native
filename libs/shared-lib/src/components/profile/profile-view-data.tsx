import { FC } from "react";
import { Text, View } from "react-native";

import { ProfileDataProps } from "./profile-view-data.types";

export const ProfileViewData = <TDataType extends string | number | boolean>({
  title,
  value
}: ProfileDataProps<TDataType>): ReturnType<FC> => {
  return (
    <View className="flex gap-2">
      <Text className="text-neutral-10 text-base font-bold">{title}</Text>
      <View className="rounded-full bg-white p-3">
        <Text className="text-neutral-40">{value}</Text>
      </View>
    </View>
  );
};
