import { useRecoilCallback, useRecoilValue } from "recoil";

import { messagesAtom, profileAtom } from "../../atoms";
import { Backend } from "../../types";

export const useReceiveMessage = () => {
  const profileData = useRecoilValue(profileAtom);

  return useRecoilCallback(
    ({ set }) => {
      return (message: Backend.Message) => {
        set(messagesAtom(message.room), oldMessages => {
          message.typeM = message.user.email === profileData?.email ? "sent" : "received";
          const messagesResult = [message, ...oldMessages.results];
          return { ...oldMessages, results: messagesResult };
        });
      };
    },
    [profileData]
  );
};
