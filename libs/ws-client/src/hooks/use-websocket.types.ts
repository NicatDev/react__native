import type { WebsocketClient } from "../utils/websocket-client";

export interface UseWebsocketProps<TData> {
  onConnect?(this: WebsocketClient): void;
  onMessage?(this: WebsocketClient, data: TData): void;
  onError?(this: WebsocketClient, err: Error): void;
  onDisconnect?(this: WebsocketClient): void;
}
