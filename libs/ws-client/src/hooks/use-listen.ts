import { useEffect, useState } from "react";

import { UseListenProps } from "./use-listen.types";
import { useWebsocket } from "./use-websocket";

export const useListen = <TData>(
  name: string,
  options: UseListenProps<TData> = {}
): (typeof options)["isListOfValues"] extends true ? TData[] : TData | null => {
  const wsClient = useWebsocket(name);
  const [messages, setMessages] = useState<TData[]>([]);
  const [message, setMessage] = useState<TData | null>(null);

  useEffect(() => {
    if (!wsClient) return;
    const unsubscribe = wsClient.listen((data: TData) => {
      wsClient.on("message", options.onMessage);
      if (options.isListOfValues) {
        setMessages(prev => [...prev, data]);
        return;
      }
      setMessage(data);
    });

    return () => {
      unsubscribe();
    };
  }, [wsClient]);

  // @ts-ignore
  return options.isListOfValues ? messages : message;
};
