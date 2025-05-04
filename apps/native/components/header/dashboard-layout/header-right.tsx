import { useNavigation } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";

import { Block, Icon } from "@mdreal/ui-kit";

export const HeaderRight: FC = () => {
  const navigation = useNavigation("/(dashboard)");

  const redirectToChat = () => {
    // @ts-ignore
    navigation.navigate("(chat)/chat");
  };

  const redirectToNotifications = () => {
    // @ts-ignore
    navigation.navigate("(notification)/notification");
  };

  return (
    <Block className="flex w-8 flex-row items-center justify-end gap-4 pr-4">
      <Pressable onPress={redirectToChat}>
        <Icon name="chat" variables={{ stroke: "#005ABF" }} />
      </Pressable>
      <Pressable onPress={redirectToNotifications}>
        <Icon name="notifications" variables={{ stroke: "#005ABF", checkmark: "none" }} />
      </Pressable>
    </Block>
  );
};
