import { atomFamily, selectorFamily } from "recoil";

import { TaskFilter } from "../../types";
import { fields } from "../../utils";

export const taskFiltersAtom = atomFamily<TaskFilter, "connection" | "problem">({
  key: fields.tasks.filter.toString(),
  default: { status: "all" }
});

export const tasksFilterSelector = selectorFamily<Partial<TaskFilter>, "connection" | "problem">({
  key: fields.tasks.filter.partial.toString(),
  get: type => {
    return ({ get }) => get(taskFiltersAtom(type));
  },
  set: type => {
    return ({ get, set }, newValue) => {
      const taskFilter = taskFiltersAtom(type);
      const current = get(taskFilter);
      set(taskFilter, { ...current, ...newValue });
    };
  }
});
