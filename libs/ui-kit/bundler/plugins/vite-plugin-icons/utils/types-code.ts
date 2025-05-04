import type { Icons } from "@internal/types/icons.generated";

export type BooleanValues<TState> = Record<keyof TState, boolean>;
export type StringValues<TVariables extends readonly string[]> = Partial<Record<TVariables[number], string>>;
export type IconType = unknown;

export interface StatefulIcon<TStates, TVariable extends readonly string[]> {
  icon: IconType;
  state: TStates;
  variables?: TVariable;
}

export interface IconBaseState<TVariables extends readonly string[]> {
  icon: IconType;
  variables: TVariables;
}

// Utility types
export type IconStates<TIconName extends keyof Icons> =
  Icons[TIconName] extends StatefulIcon<infer TState, any> ? BooleanValues<TState> : {};

export type IconState<TIconName extends keyof Icons> =
  Icons[TIconName] extends StatefulIcon<infer TState, any> ? keyof TState : "";

export type IconVariables<
  TIconName extends keyof Icons,
  TState extends IconState<TIconName> | false
> = TState extends false
  ? Icons[TIconName] extends StatefulIcon<any, infer TVariables extends readonly string[]>
    ? StringValues<TVariables>
    : unknown
  : Icons[TIconName] extends StatefulIcon<infer TFoundState, any>
    ? TState extends keyof TFoundState
      ? TFoundState[TState] extends { variables: infer TVariables extends readonly string[] }
        ? StringValues<TVariables>
        : unknown
      : unknown
    : unknown;

export const statefulIcon = <TStates, TVariable extends readonly string[]>(
  icon: IconType,
  state: TStates,
  variables: TVariable
): StatefulIcon<TStates, TVariable> => ({ icon, state, variables });
