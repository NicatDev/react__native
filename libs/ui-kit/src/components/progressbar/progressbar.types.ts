import type { BaseProps } from "@/types/base-props";

export interface ProgressbarProps extends BaseProps<"div"> {
  progress: number;
}
