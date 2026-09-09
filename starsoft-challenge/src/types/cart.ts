import { ImageSource } from "./product";

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: ImageSource;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
