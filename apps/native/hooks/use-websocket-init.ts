import { useChatInit } from "./init/use-chat-init";
import { useLocationInit } from "./init/use-location-init";
import { useNotificationInit } from "./init/use-notification-init";

export const useWebsocketInit = () => {
  useLocationInit();
  useNotificationInit();
  useChatInit();
};
