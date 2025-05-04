import { createContext } from "react";

import { WebsocketClient } from "./utils/websocket-client";

export interface WebSocketClients {
  clients: Record<string, WebsocketClient>;

  addClient(name: string, client: WebsocketClient): void;

  removeClient(name: string): void;
}

export const WebsocketContext = createContext<WebSocketClients>(null!);
