import { Message } from "./message";
import { ProfileData } from "./profile-data";

export interface ChatRoom {
  id: number;
  name: string;
  members: Member[];
  admin: Member;
  last_message?: Message;
}

export interface Member extends Omit<ProfileData, "profil_picture"> {
  username: string;
}
