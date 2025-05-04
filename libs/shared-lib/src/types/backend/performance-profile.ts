import { ProfileData } from "./profile-data";

export interface PerformanceProfile
  extends Pick<ProfileData, "id" | "user_type" | "first_name" | "last_name" | "group"> {
  task_count: Taskcount;
}

export interface Taskcount {
  total: number;
  connection: number;
  problem: number;
}
