import { FC } from "react";

import { IconState, Icons } from "@internal/icons";

import { GeneratedIconComponentProps, IconProps } from "./icon.types";

export const useGetIcon = <TIcon extends keyof Icons, TState extends IconState<TIcon> | false>(
  icons: Icons,
  { name, state }: Pick<IconProps<TIcon, TState>, "name" | "state">
) => {
  const baseIcon = icons[name] as any;
  if (!baseIcon || (state && !baseIcon.state?.[state])) {
    throw new Error(`Icon "${name}" ${state ? `with state "${state}"` : ""} not found`);
  }
  return (state ? baseIcon.state?.[state].icon : baseIcon.icon || baseIcon) as FC<
    GeneratedIconComponentProps<TIcon, TState>
  >;
};
