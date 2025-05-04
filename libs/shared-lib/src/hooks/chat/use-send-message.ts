import { type DependencyList, useCallback } from "react";

import { Backend } from "../../types";

export const useSendMessage = (
  cb: (message: Pick<Backend.Message, "content" | "room">) => void,
  deps: DependencyList
) => {
  return useCallback((message: Pick<Backend.Message, "content" | "room">) => {
    cb(message);
  }, deps);
};
