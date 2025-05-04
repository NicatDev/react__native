import { TaskStatuses } from "@digitask/shared-lib";

export const statuses = [
  TaskStatuses.All,
  TaskStatuses.Waiting,
  TaskStatuses.InProgress,
  TaskStatuses.Started,
  TaskStatuses.Completed
];

export const translations = {
  [TaskStatuses.All]: "Hamısı",
  [TaskStatuses.Waiting]: "Gözləyir",
  [TaskStatuses.InProgress]: "Qəbul edilib",
  [TaskStatuses.Started]: "Başlanıb",
  [TaskStatuses.Completed]: "Tamamlandı"
};

export const buttonTranslations = {
  [TaskStatuses.Waiting]: "Qəbul et",
  [TaskStatuses.InProgress]: "Başla",
  [TaskStatuses.Started]: "Tamamla",
  [TaskStatuses.Completed]: "Tamamlandı"
};
