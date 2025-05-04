import { DateRange } from "@digitask/shared-lib";

export interface RangePickerProps {
  onChange?(range: DateRange | null): void;
}
