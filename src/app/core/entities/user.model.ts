import { ImgData } from './imgData.model';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  avatar: Partial<ImgData> | null;
  item: [];
  role: 'USER' | 'ADMIN' | 'CLUB';
};
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  birthday: string;
  avatar?: Partial<ImgData> | null;
};

export type UserUpdateDto = {
  email?: string;
  name?: string;
  password?: string;
  birthday?: string;
  avatar?: Partial<ImgData> | null;
};
export type LoginUserDto = {
  id: string;
  name: string;
  email?: string;
  password: string;
};
