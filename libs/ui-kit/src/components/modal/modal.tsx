import { ForwardRefRenderFunction, PropsWithChildren, forwardRef } from "react";

import { ModalProps, ModalRef } from "./modal.types";

const ModalBase: ForwardRefRenderFunction<ModalRef, PropsWithChildren<ModalProps>> = ({}, _ref) => {
  return null;
};

export const Modal = forwardRef(ModalBase);
