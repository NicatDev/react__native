import { FC } from "react";
import { Text, View } from "react-native";

import { Block, If } from "@mdreal/ui-kit";

import { FieldProps } from "./field.types";

export const Field: FC<FieldProps> = ({ icon, label, value }) => {
  return (
    <Block>
      <Block className="flex flex-row flex-wrap gap-2 px-1">
        <View>{icon}</View>
        <Text className="flex-1">{label}</Text>
        <If condition={typeof value === "string"}>
          <If.Then>
            <Text>{value}</Text>
          </If.Then>

          <If.Else>{value}</If.Else>
        </If>
      </Block>
      <View className="border-b-primary mt-2 w-full border-b-[1px] bg-transparent" />
    </Block>
  );
};
