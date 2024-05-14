import { Avatar } from './imgData.model';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  avatar: Avatar | null;
  item?: [];
  role: 'USER' | 'ADMIN' | 'CLUB';
};
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  birthday: string;
  avatar?: File;
};

export type UserUpdateDto = {
  email?: string;
  name?: string;
  password?: string;
  birthday?: string;
  avatar?: Partial<Avatar> | null;
};
export type LoginUserDto = {
  name: string;
  email?: string;
  password: string;
};
