import { vi } from 'vitest';
import type { SVGProps } from 'react';
import type { UserData } from '../types/types';

vi.mock('../assets/close-x.svg?react', () => ({
  default: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} />
  ),
}));

export const mockUser: UserData = {
  id: 0,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'StrongP@ss123',
  age: 25,
  gender: 'male',
  country: 'Russia',
  terms: true,
  avatar: 'base64encodedstring',
};

export const mockUser2: UserData = {
  id: 1,
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: 'AnotherP@ss123',
  age: 30,
  gender: 'female',
  country: 'Canada',
  terms: true,
  avatar: 'base64encodedstring2',
};
