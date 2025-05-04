import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";

import { BlockProps } from "../block.types";
import { FadeViewProps } from "./fade-view.types";

export const FadeView: FC<PropsWithChildren<BlockProps & FadeViewProps>> = ({ children, className }) => {
  return (
    <motion.div
      className={`flex h-full w-full flex-col bg-white ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
