import { ComponentProps } from "react";

export interface Gradient {
  from?: string;
  via?: string;
  to?: string;
  sideTo?: "r" | "rb" | "b" | "lb" | "l" | "lt" | "t" | "rt";
}

export interface LinearGradientProps extends Gradient, Pick<ComponentProps<"div">, "className"> {}
