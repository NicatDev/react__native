import { atomFamily } from "recoil";

import { Backend } from "../../../types";
import { fields } from "../../../utils";

export const warehouseItemsAtom = atomFamily<Backend.WarehouseItem[], number | null>({
  key: fields.warehouse.item,
  default: []
});
