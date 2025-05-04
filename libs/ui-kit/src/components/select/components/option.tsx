import type { FC } from "react";

import type { OptionProps } from "./option.types";

export const Option = <TValue,>({ children }: OptionProps<TValue>): ReturnType<FC> => {
  return <>{children}</>;
};
