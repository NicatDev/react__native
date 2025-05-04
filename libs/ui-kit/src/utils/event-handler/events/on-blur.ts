import { BlurTarget } from "../../../types/event-handler/targets/blur-target";
import { Platform } from "../../../types/platform";
import { EventFn } from "./index";

export const onBlur: EventFn<"onBlur"> = ({ getSyntheticEvent, getEvent }) => {
  // @ts-ignore
  const webEvent = getEvent(Platform.Web);
  // @ts-ignore
  const nativeEvent = getEvent(Platform.Native);

  return getSyntheticEvent<BlurTarget>({});
};
