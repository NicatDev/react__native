import { ProfileData } from "./profile-data";

export interface Message {
  id: number;
  user: Pick<ProfileData, "id" | "email" | "first_name" | "last_name">;
  typeM: "received" | "sent";
  content: string;
  timestamp: string;
  room: number;
}
