export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  country: string;
  terms: boolean;
}

export interface RegisterFormData extends Omit<UserData, 'avatar'> {
  confirmPassword: string;
  avatar: string | undefined;
}
