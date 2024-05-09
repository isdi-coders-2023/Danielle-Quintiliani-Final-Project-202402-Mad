import { Item } from './item.model';

export type Avatar = {
  publicId: string;
  folder: string;
  fieldName: string;
  originalName: string;
  secureUrl: string;
  resourceType: string;
  mimetype: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
};

export type ItemImg = Avatar & {
  item: Item;
  itemId: string;
};
