import { type NumberInputTarget, type TextInputTarget } from "../../../types/event-handler/targets/input-target";
import { Platform } from "../../../types/platform";
import { EventFn } from "./index";

export const onChange: EventFn<"onChange"> = ({ getSyntheticEvent, getEvent, props }) => {
  const webEvent = getEvent(Platform.Web);
  const nativeEvent = getEvent(Platform.Native);
  const type = props.type || "text";
  const value = webEvent.target.value || nativeEvent.nativeEvent.text;

  if (type === "number") {
    return getSyntheticEvent<NumberInputTarget>({ type: "number", valueAsNumber: +value, value });
  }

  return getSyntheticEvent<TextInputTarget>({ type: "text", value });
};
