export interface AuthToken {
  email: string;
  access_token: string;
  refresh_token: string;
  user_type: string;
  is_admin: boolean;
  phone: string;
}
