import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  View
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  Backend,
  DateService,
  activeChatRoomMessagesSelector,
  activeChatRoomPageSizeAtom,
  activeChatRoomPaginationSelector,
  api,
  defaultMessagesSize,
  fields,
  flatListInitialLoadNumber,
  flatListNumPerPage,
  messagesAtom,
  useRecoilQuery,
  useSendMessage
} from "@digitask/shared-lib";
import { Button, Icon, cn } from "@mdreal/ui-kit";
import { useWebsocket } from "@mdreal/ws-client";
import { useMutation } from "@tanstack/react-query";

import { palette } from "../../../../../../palette";
import { BlockContainer } from "../../../../components/blocks";

const renderMessageItem: ListRenderItem<Backend.Message> = ({ item: message }) => {
  const isMe = message.typeM === "sent";
  const date = DateService.from(message.timestamp).format("HH:mm");

  return (
    <View className={cn("my-2 max-w-[70%] rounded-xl p-3", isMe ? "bg-primary self-end" : "self-start bg-white")}>
      <Text className={cn("text-base", isMe && "text-white")}>{message.content}</Text>
      <Text className={cn("self-end text-xs", isMe ? "text-white" : "text-neutral")}>{date}</Text>
    </View>
  );
};

export default function Chat() {
  const { chatRoomId } = useLocalSearchParams<{ chatRoomId: string }>();
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [writtenMessage, setWrittenMessage] = useState<string | null>(null);
  const size = useRecoilValue(activeChatRoomPageSizeAtom);
  const [pagination, setPagination] = useRecoilState(activeChatRoomPaginationSelector);
  const [messages, setMessages] = useRecoilState(activeChatRoomMessagesSelector);

  const wsClient = useWebsocket(fields.chat.toString());

  useRecoilQuery(messagesAtom(+chatRoomId), {
    queryKey: [fields.chat.messages],
    queryFn: () => api.accounts.messages.$get({ room: +chatRoomId, page: 1, size: defaultMessagesSize }),
    enabled: !!chatRoomId
  });

  const fetchMessagesMutation = useMutation({
    mutationKey: [fields.chat.messages],
    mutationFn: ({ page }: { page: number }) => api.accounts.messages.$get({ room: +chatRoomId, page, size })
  });

  const loadMoreMessages = async () => {
    if (isMessagesLoading || !pagination.next) return;
    setIsMessagesLoading(true);
    const url = new URL(pagination.next);
    const nextPage = +url.searchParams.get("page")!;
    const oldMessages = await fetchMessagesMutation.mutateAsync({ page: nextPage });
    setMessages(oldMessages.results);
    setPagination(pagination => ({ ...pagination, next: oldMessages.next }));
    setIsMessagesLoading(false);
  };

  const sendMessage = useSendMessage(
    message => {
      if (!wsClient) return;
      console.log("ws-client:sendMessage", message);
      wsClient.send(message);
    },
    [+chatRoomId, wsClient]
  );

  const handleSendMessage = () => {
    if (!writtenMessage) return;
    sendMessage({ room: +chatRoomId, content: writtenMessage });
    setWrittenMessage(null);
  };

  const handleScroll = async (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + height > event.nativeEvent.contentSize.height) {
      await loadMoreMessages();
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 px-4"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={message => message.id.toString()}
        renderItem={renderMessageItem}
        inverted
        onScroll={handleScroll}
        initialNumToRender={flatListInitialLoadNumber}
        windowSize={messages.length > 50 ? messages.length / 4 : 21}
        maxToRenderPerBatch={flatListNumPerPage}
        updateCellsBatchingPeriod={flatListNumPerPage / 2}
      />

      <View className="px-4 pb-8 pt-2">
        <BlockContainer className="border-neutral-90 flex flex-row items-center justify-between gap-4 border-2">
          <View className="flex-1">
            {/* ToDo: Replace with <Input /> components */}
            <TextInput
              className="border-transparent"
              placeholder="Mesaj yaz..."
              value={writtenMessage || ""}
              onChange={event => setWrittenMessage(event.nativeEvent.text)}
              autoCorrect={false}
            />
          </View>
          <Button variant="none" onClick={handleSendMessage}>
            <Icon name="send" state="digitask" variables={{ fill: palette.primary["50"] }} />
          </Button>
        </BlockContainer>
      </View>
    </KeyboardAvoidingView>
  );
}
