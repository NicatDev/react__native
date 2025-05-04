import { usePathname } from "expo-router";
import { useRecoilState, useRecoilValue } from "recoil";

import { Backend, fields, profileAtom, signInAtom, useReceiveMessage } from "@digitask/shared-lib";
import { AuthHttp, logger } from "@mdreal/ui-kit";
import { useWebsocket } from "@mdreal/ws-client";

import { useShowMessageNotification } from "../use-show-message-notification";
import { useWsHostUrl } from "./use-ws-host-url";

export const useChatInit = () => {
  const pathname = usePathname();
  const receiveMessage = useReceiveMessage();
  const profileData = useRecoilValue(profileAtom);
  const [signInData, setSignInData] = useRecoilState(signInAtom);

  const showMessageNotification = useShowMessageNotification();
  const wsHostUrl = useWsHostUrl();

  useWebsocket<Backend.Message>(
    fields.chat.toString(),
    `${wsHostUrl}/chat/?email=${profileData?.email}&token=${signInData?.access_token}`,
    {
      onConnect() {
        logger.debug(
          "digitask.native:hooks:use-websocket-init",
          `${wsHostUrl}/chat/?email=${profileData?.email}&token=${signInData?.access_token}`
        );
      },
      onError(error) {
        logger.debug("digitask.native:hooks:use-websocket-init:error", error);
      },
      onMessage(message) {
        if (typeof message === "object") {
          if ("email" in message) {
            logger.debug("digitask.native:hooks:use-websocket-init:logger-user-email", message.email);
          }

          if ("room" in message) {
            receiveMessage(message);

            if (!(message.typeM === "sent" || pathname.startsWith("/room/"))) {
              showMessageNotification(message);
            }
          }
        }
      },
      onDisconnect() {
        AuthHttp.instance()
          .refreshToken()
          .then(data => {
            const access_token = data?.access;
            const refresh_token = data?.refresh;
            if (!data || !access_token || !refresh_token) return;
            setSignInData(prev => (prev === null ? prev : { ...prev, access_token, refresh_token }));
          });
      }
    },
    [pathname]
  );
};
