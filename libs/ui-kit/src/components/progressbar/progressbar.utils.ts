import { variantClassMap } from "@/utils/variant-class-map";

import { cn } from "@/utils";

export const progressbarVariantsClassMap = variantClassMap({
  primary: cn("bg-primary"),
  secondary: cn(),
  link: cn(),
  danger: cn()
});
