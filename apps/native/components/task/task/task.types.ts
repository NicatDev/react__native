import { Backend, DateService, type TagProps } from "@digitask/shared-lib";

export interface TaskDate {
  start: DateService;
  end: DateService;
}

export interface TaskProps {
  task: Backend.Task;
  tags: TagProps[];

  updateTask?(task: Backend.Task): void;
}
