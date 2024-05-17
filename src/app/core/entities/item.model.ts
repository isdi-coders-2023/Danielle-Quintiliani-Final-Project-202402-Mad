import { ItemImg } from './imgData.model';
import { User } from './user.model';

export type Item = {
  id: string;
  title: string;
  content: string;
  price: string;
  owner: User;
  category: Category;
  ownerItemId: string;
  image: ItemImg[];
  createdAt: string;
};
export type Category = 'CLOTHES' | 'MOTO' | 'SPAREPARTS' | 'OTHER';
