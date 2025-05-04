import { useRecoilValue } from "recoil";

import {
  Backend,
  fields,
  notificationAtom,
  profileAtom,
  signInAtom,
  useRecoilArrayControls
} from "@digitask/shared-lib";
import { useWebsocket } from "@mdreal/ws-client";

import { useWsHostUrl } from "./use-ws-host-url";

export const useNotificationInit = () => {
  const notificationControls = useRecoilArrayControls(notificationAtom);
  const profileData = useRecoilValue(profileAtom);
  const signInData = useRecoilValue(signInAtom);

  const wsHostUrl = useWsHostUrl();
  useWebsocket<{
    message: Backend.NotificationMessage[];
  }>(fields.notification, `${wsHostUrl}/notification/?email=${profileData?.email}&token=${signInData?.access_token}`, {
    onConnect() {},
    onMessage(data) {
      data.message.forEach(notification => notificationControls.add(notification));
    },
    onDisconnect() {
      notificationControls.clear();
    }
  });
};
