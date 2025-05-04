import { useWebsocket } from "./use-websocket";

export const useEmit = <TData>(name: string, event: string) => {
  const wsClient = useWebsocket(name);

  return (data: TData) => {
    if (!wsClient) return;
    wsClient.send({ event, data });
  };
};
