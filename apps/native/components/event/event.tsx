import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { DateService } from "@digitask/shared-lib";
import { Block, Icon } from "@mdreal/ui-kit";

import { BlockContainer } from "../blocks";
import { EventProps } from "./event.types";

import event from "../../assets/images/event.png";

export const Event: FC<EventProps> = ({ id, name, date, description }) => {
  const router = useRouter();

  const handleRedirectToEvent = () => {
    router.push({ pathname: "/(dashboard)/(event)/[id]", params: { id } });
  };

  return (
    <Pressable onPress={handleRedirectToEvent}>
      <BlockContainer className="bg-primary rounded-2xl p-6">
        <Block className="flex flex-row">
          <View className="flex flex-1 gap-4">
            <View className="flex flex-row gap-4">
              <Icon name="clock" variables={{ fill: "white" }} />
              <Text className="text-base text-white">{DateService.from(date).toLocaleDateString("az-AZ")}</Text>
            </View>
            <View>
              <Text className="text-2xl text-white">{name}</Text>
            </View>
          </View>

          <View>
            <Image source={event} style={{ width: 140, height: 140 }} />
          </View>
        </Block>

        <Block className="flex flex-row items-center justify-between">
          <Text className="line-clamp-1 text-xl text-white">{description}</Text>
          <Icon name="arrow-right" variables={{ fill: "white" }} />
        </Block>
      </BlockContainer>
    </Pressable>
  );
};
