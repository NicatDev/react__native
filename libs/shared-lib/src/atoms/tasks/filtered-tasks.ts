import { selectorFamily } from "recoil";

import { Backend } from "../../types";
import { fields } from "../../utils";
import { tasksAtom } from "../backend";
import { taskFiltersAtom } from "./filters";

export const filteredTasksSelector = selectorFamily<Backend.Task[], "connection" | "problem">({
  key: fields.tasks.filtered.toString(),
  get: type => {
    return ({ get }) => {
      const tasks = get(tasksAtom(type));
      const filter = get(taskFiltersAtom(type));

      return tasks.filter(task => !(filter.status !== "all" && task.status !== filter.status));
    };
  }
});
