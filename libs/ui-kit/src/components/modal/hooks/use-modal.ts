import { ForwardedRef, useImperativeHandle, useState } from "react";

import { ModalRef } from "../modal.types";

interface UseModalOptions {
  ref: ForwardedRef<ModalRef>;
  onOpen: (open: () => void) => void;
  onClose: (close: () => void) => void;
}

export const useModal = ({ ref, onClose, onOpen }: UseModalOptions) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    onOpen(() => setIsModalVisible(true));
  };

  const closeModal = () => {
    onClose(() => setIsModalVisible(false));
  };

  useImperativeHandle(ref, () => ({ isOpen: isModalVisible, open: openModal, close: closeModal }), [
    isModalVisible,
    openModal,
    closeModal
  ]);

  return { isModalVisible, openModal, closeModal };
};
