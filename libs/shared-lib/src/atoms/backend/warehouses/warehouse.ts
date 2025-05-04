import { atom } from "recoil";

import type { Backend } from "../../../types";
import { fields } from "../../../utils";

export const warehouseAtom = atom<Backend.Warehouse[]>({
  key: fields.warehouse.toString(),
  default: []
});
