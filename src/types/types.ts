export interface UserData {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string | undefined;
  age: number;
  gender: string;
  country: string;
  terms: boolean;
}

export interface FormValues {
  name: string;
  email: string;
  gender: string;
  age: number;
  password: string;
  confirmPassword: string;
  avatar: File;
  country: string;
  terms: boolean;
}
