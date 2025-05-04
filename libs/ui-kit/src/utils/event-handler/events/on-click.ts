import { EventFn } from "./index";

export const onClick: EventFn<"onClick"> = ({ getSyntheticEvent }) => {
  return getSyntheticEvent({});
};
