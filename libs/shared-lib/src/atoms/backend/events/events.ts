import { atom } from "recoil";

import { Backend } from "../../../types";
import { fields } from "../../../utils";

export const eventsAtom = atom<Backend.Event[]>({
  key: fields.event.toString(),
  default: []
});
