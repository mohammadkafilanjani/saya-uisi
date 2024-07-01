export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
}

export interface UserEditForm {
  name: string;
  phone_number: number;
  image?: null | File;
  _method?: string;
}
