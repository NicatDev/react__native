import { ComponentProps } from "react";

import { Block, Gradient } from "@mdreal/ui-kit";

export interface BlockContainerProps extends Partial<Pick<ComponentProps<typeof Block>, "className">> {
  gradient?: Gradient;
}
