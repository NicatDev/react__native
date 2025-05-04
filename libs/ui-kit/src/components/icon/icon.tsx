import { FC } from "react";

import { IconState, Icons, icons } from "@internal/icons";

import { IconProps } from "./icon.types";
import { useGetIcon } from "./use-get-icon";

export const Icon = <TIcon extends keyof Icons, TState extends IconState<TIcon> | false = false>({
  variables,
  ...props
}: IconProps<TIcon, TState>): ReturnType<FC> => {
  const Icon = useGetIcon(icons, props);
  return <Icon {...(variables || ({} as unknown as typeof variables))!} />;
};
