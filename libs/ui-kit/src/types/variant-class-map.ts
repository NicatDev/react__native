import type { ComponentProps } from "react";

import type { Variant } from "./variant";

export type VariantClassMap = Record<Variant, ComponentProps<"div">["className"]>;
