import { atomFamily } from "recoil";

import { Task } from "../../../types/backend";
import { fields } from "../../../utils";

export const tasksAtom = atomFamily<Task[], "connection" | "problem">({
  key: fields.tasks.toString(),
  default: []
});
