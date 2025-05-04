import { Text } from "react-native";
import { useRecoilValue } from "recoil";

import { notificationAtom } from "@digitask/shared-lib";
import { Block } from "@mdreal/ui-kit";

import { BlockContainer } from "../../../components/blocks";

export default function Welcome() {
  const notifications = useRecoilValue(notificationAtom);

  return (
    <Block.Scroll contentClassName="p-4 gap-4">
      {notifications.map(notification => (
        <BlockContainer key={notification.id} className="bg-neutral-80">
          <Text>{notification.message}</Text>
        </BlockContainer>
      ))}
    </Block.Scroll>
  );
}
