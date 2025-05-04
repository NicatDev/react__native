import { atom } from "recoil";

import { DateRange } from "../../../types";
import { PerformanceProfile } from "../../../types/backend";
import { fields } from "../../../utils";

export const performanceAtom = atom<PerformanceProfile[]>({
  key: fields.performance,
  default: []
});

export const rangeDateAtom = atom<Partial<DateRange> | null>({
  key: fields.rangeDate,
  default: null
});
