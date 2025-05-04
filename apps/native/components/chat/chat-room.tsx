import { useNavigation } from "expo-router";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";
import { useSetRecoilState } from "recoil";

import { activeChatRoomIdAtom } from "@digitask/shared-lib";
import { Block } from "@mdreal/ui-kit";

import { ChatRoomProps } from "./chat-room.types";

export const ChatRoom: FC<ChatRoomProps> = ({ room }) => {
  const setChatRoomId = useSetRecoilState(activeChatRoomIdAtom);
  const navigation = useNavigation("/(dashboard)");

  const redirect = () => {
    setChatRoomId(room.id);
    // @ts-ignore
    navigation.navigate("(chat)/room/[chatRoomId]", { chatRoomId: room.id });
  };

  return (
    <Pressable onPress={redirect}>
      <Block className="bg-white px-4 py-3">
        <View className="flex flex-row items-center gap-4">
          <View className="bg-neutral-95 flex h-12 w-12 items-center justify-center rounded-full">
            <Text className="text-primary">{room.name.slice(0, 1).toUpperCase()}</Text>
          </View>
          <View className="flex flex-1 gap-2">
            <View className="flex flex-row justify-between">
              <Text>{room.name}</Text>
              <Text className="text-neutral-20"></Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-neutral line-clamp-1">{room.last_message?.content}</Text>
              {/*<View className="bg-success-60 flex h-5 w-5 items-center justify-center rounded-full text-white">*/}
              {/*  <Text className="text-xs text-white">__</Text>*/}
              {/*</View>*/}
            </View>
          </View>
        </View>
      </Block>
    </Pressable>
  );
};
