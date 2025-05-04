import { Variable } from "./variable";

export interface IconData {
  path: string;
  content: string;
  states: Record<string, Omit<IconData, "states" | "stateList">>;
  stateList: Set<string>;
  variables: Record<string, Variable>;
}

export type IconDataMap = Record<string, IconData>;
