import { ComponentStates, DEFAULT_STATE } from "./components-states";

export type VariantColors = Partial<
  Record<Variants[number], string | Partial<Record<string & ComponentStates, string>>> &
    Record<"light" | "dark", string> &
    Record<"disabled", string | Partial<Record<DEFAULT_STATE | "text", string>>>
>;
