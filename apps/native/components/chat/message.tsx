import { FC } from "react";
import { Text, View } from "react-native";

import { DateService } from "@digitask/shared-lib";

import { ViewContainer } from "../views/view-container";
import { MessageProps } from "./message.types";

export const Message: FC<MessageProps> = ({ message }) => {
  const messageDate = DateService.from(message.timestamp);

  return (
    <ViewContainer>
      <View>
        <Text>{message.content}</Text>
        <Text>{messageDate.format("HH MM DD YYYY ss mm")}</Text>
      </View>
    </ViewContainer>
  );
};
