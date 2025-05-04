import { useMemo } from "react";

import { AuthHttp } from "@mdreal/ui-kit";

export const useWsHostUrl = () => {
  return useMemo(() => {
    const wsUrl = new URL(AuthHttp.settings().baseUrl);
    wsUrl.protocol = wsUrl.protocol.startsWith("https") ? "wss" : "ws";
    return wsUrl.toString().slice(0, -1);
  }, []);
};
