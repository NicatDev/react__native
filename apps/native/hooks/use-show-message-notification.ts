import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useSetRecoilState } from "recoil";

import { Backend, RoomsApiViewAtom, activeChatRoomIdAtom, api, fields, useRecoilQuery } from "@digitask/shared-lib";

export const useShowMessageNotification = () => {
  useRecoilQuery(RoomsApiViewAtom, {
    queryKey: [fields.chat.rooms],
    queryFn: () => api.accounts.RoomsApiView.$get
  });

  const setChatRoomId = useSetRecoilState(activeChatRoomIdAtom);
  const router = useRouter();

  return (message: Backend.Message) => {
    Toast.show({
      type: "info",
      text1: `${message.user.first_name} ${message.user.last_name}`,
      text2: message.content,
      position: "top",
      visibilityTime: 4000,
      autoHide: true,
      onPress() {
        Toast.hide();
        setChatRoomId(message.room);
        router.push(`/(dashboard)/(chat)/${message.room}`);
      }
    });
  };
};
