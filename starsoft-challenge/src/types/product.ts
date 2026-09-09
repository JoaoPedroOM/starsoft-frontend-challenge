import { StaticImageData } from "next/image";

export type ImageSource = string | StaticImageData;

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: StaticImageData;
}

export interface DisplayProduct extends Product {
  uniqueKey: string;
}
