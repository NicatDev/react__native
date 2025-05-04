import { useRef } from "react";

import type { ModalRef } from "../modal.types";

export const useModalRef = () => useRef<ModalRef>(null);
