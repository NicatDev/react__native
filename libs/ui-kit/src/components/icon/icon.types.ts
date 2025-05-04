import { IconState, IconVariables, Icons } from "@internal/icons";

export type GeneratedIconComponentProps<
  TIcon extends keyof Icons,
  TState extends IconState<TIcon> | false
> = IconVariables<TIcon, TState>;

export type IconProps<TIcon extends keyof Icons, TState extends IconState<TIcon> | false> = {
  name: TIcon;
  state?: TState;
} & { variables?: GeneratedIconComponentProps<TIcon, TState> };
