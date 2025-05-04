import { api, fields, tasksAtom, useRecoilQuery } from "@digitask/shared-lib";

export const useTasksInit = (taskType: "connection" | "problem") => {
  useRecoilQuery(tasksAtom(taskType), {
    queryKey: [fields.tasks, taskType],
    queryFn: () => api.services.tasks.$get(taskType)
  });
};
