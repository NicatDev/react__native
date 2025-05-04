import { atom } from "recoil";

import type { AddResourceSchema } from "../../schemas";
import { fields } from "../../utils";

export const productsAtom = atom<AddResourceSchema[]>({
  key: fields.tasks.products,
  default: []
});
