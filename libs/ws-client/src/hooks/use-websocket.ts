import { type DependencyList, useEffect, useState } from "react";

import { getOrCreateWsProvider } from "../utils/get-or-create-ws-provider";
import { WebsocketClient } from "../utils/websocket-client";
import { UseWebsocketProps } from "./use-websocket.types";

export const useWebsocket = <TData>(
  name: string,
  url?: string,
  options?: UseWebsocketProps<TData>,
  deps: DependencyList = []
): WebsocketClient | undefined => {
  const [currentWsClient, setCurrentWsClient] = useState<WebsocketClient | undefined>(undefined);

  useEffect(() => {
    const ws = getOrCreateWsProvider(name, url, options);
    const unsubscribe = WebsocketClient.subscribe(name, setCurrentWsClient);
    setCurrentWsClient(ws?.client);
    return () => {
      unsubscribe();
      ws?.unsubscribe();
    };
  }, deps);

  return currentWsClient;
};
