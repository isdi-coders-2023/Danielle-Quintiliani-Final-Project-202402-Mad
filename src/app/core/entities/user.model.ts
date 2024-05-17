import { Avatar } from './imgData.model';
import { Item } from './item.model';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  avatar: Avatar | null;
  favorite?: Item[];
  item?: Item[];
  role: 'USER' | 'ADMIN' | 'CLUB';
}

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
