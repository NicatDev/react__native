import { FC } from "react";

import { Variant, Variants } from "@/types/variant";

import { cn } from "@/utils";

import { ProgressbarProps } from "./progressbar.types";
import { progressbarVariantsClassMap } from "./progressbar.utils";

export const Progressbar: FC<ProgressbarProps> = ({ variant = Variants.Primary as Variant, progress }) => {
  const variantClass = progressbarVariantsClassMap[variant];

  return (
    <div className="h-1 w-full rounded-full bg-gray-200">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-300",
          variantClass,
          progress === 0 ? "w-0" : `w-p${progress}`
        )}
      />
    </div>
  );
};
