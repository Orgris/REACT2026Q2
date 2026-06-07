export interface UserData {
  email: string;
  password: string;
  name: string;
  avatar: File | null;
  age: number;
  gender: string;
  country: string;
  terms: boolean;
}

export interface RegisterFormData extends UserData {
  confirmPassword: string;
}
