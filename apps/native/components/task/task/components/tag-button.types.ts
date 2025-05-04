import type { TagProps } from "./tag.types";

export interface TagButtonProps {
  status: TagProps;
  isActive: boolean;

  onClick(tag: TagProps): void;
}
