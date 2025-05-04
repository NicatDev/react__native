import { ComponentProps, JSX, ReactElement } from "react";

import { Icon } from "@mdreal/ui-kit";

export interface FieldProps {
  icon?: ReactElement<ComponentProps<typeof Icon>, typeof Icon>;
  label: string;
  value: string | JSX.Element;
}
