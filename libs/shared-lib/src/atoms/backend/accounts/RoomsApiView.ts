import { atom } from "recoil";

import { Backend } from "../../../types";
import { fields } from "../../../utils";

export const RoomsApiViewAtom = atom<Backend.ChatRoom[]>({
  key: fields.chat.rooms.toString(),
  default: []
});
