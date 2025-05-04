import { useState } from "react";
import { Text, View } from "react-native";

import { RoomsApiViewAtom, api, fields, useRecoilQuery } from "@digitask/shared-lib";
import { Block, If, Input } from "@mdreal/ui-kit";

import { ChatRoom } from "../../../components/chat";

export default function Chat() {
  const [searchString, setSearchString] = useState<string | null>(null);
  const { data: rooms = [], isPending } = useRecoilQuery(RoomsApiViewAtom, {
    queryKey: [fields.chat.rooms],
    queryFn: () => api.accounts.RoomsApiView.$get
  });

  return (
    <Block.Scroll>
      <View className="px-6 py-3">
        <Input
          placeholder="Axtar"
          variant="secondary"
          className="placeholder:text-neutral"
          icon={{ left: "search", right: "filter" }}
          onChange={e => setSearchString(e.target.value)}
          value={searchString || ""}
        />
      </View>
      <Block className="flex">
        <If condition={isPending}>
          <If.Then>
            <Text>Yüklənir</Text>
          </If.Then>

          <If.Else>
            {rooms
              .filter(room => searchString === null || room.name.includes(searchString))
              .map(room => (
                <ChatRoom key={room.id} room={room} />
              ))}
          </If.Else>
        </If>
      </Block>
    </Block.Scroll>
  );
}
