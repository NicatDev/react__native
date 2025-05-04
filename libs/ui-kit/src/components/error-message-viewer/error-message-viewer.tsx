import isEmpty from "lodash.isempty";

import type { FC } from "react";

import { When } from "../when";
import type { ErrorMessageViewerProps } from "./error-message-viewer.types";

export const ErrorMessageViewer: FC<ErrorMessageViewerProps> = ({ error }) => {
  const errorMessages = Array.isArray(error) ? error : [error];
  const hasError = errorMessages.length > 0;
  const errorMessagesString = errorMessages
    .map(message => (isEmpty(message) ? "" : typeof message === "object" ? message.message : !!message ? message : ""))
    .filter(Boolean);

  return (
    <When condition={hasError}>
      {errorMessagesString.map((message, index, self) => (
        <When key={index} condition={!!message}>
          <span className="text-sm text-red-600">{message}</span>
          <When condition={index < self.length - 1 && !!self[index + 1]}>
            <span className="text-sm text-red-600">, </span>
          </When>
        </When>
      ))}
    </When>
  );
};
