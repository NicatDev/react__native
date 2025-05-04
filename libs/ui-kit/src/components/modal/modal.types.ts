import { IconVariables } from "@internal/icons/types";

export type CloseBtnProps = IconVariables<"close", "modal">;

export interface ModalProps {
  type: "bottom" | "popup";
  animationSpeed?: "none" | "fast" | "normal" | "slow" | number;
  defaultHeight?: number;
  closeBtn?: boolean | CloseBtnProps;
  className?: string;
}

export interface ModalRef {
  isOpen: boolean;
  open(): void;
  close(): void;
}
