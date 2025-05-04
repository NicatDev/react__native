import { Group } from "./group";

export interface ProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: string;
  group: Group;
  profil_picture?: any;
}
