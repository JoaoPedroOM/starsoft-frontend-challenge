import { StaticImageData } from "next/image";

import produto01 from "@/assets/images/Produtos/produto_01.png";
import produto02 from "@/assets/images/Produtos/produto_02.png";
import produto03 from "@/assets/images/Produtos/produto_03.png";
import produto04 from "@/assets/images/Produtos/produto_04.png";
import produto05 from "@/assets/images/Produtos/produto_05.png";
import produto06 from "@/assets/images/Produtos/produto_06.png";
import produto07 from "@/assets/images/Produtos/produto_07.png";
import produto08 from "@/assets/images/Produtos/produto_08.png";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: StaticImageData;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 32,
    image: produto01,
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 12,
    image: produto02,
  },
  {
    id: 3,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 45,
    image: produto03,
  },
  {
    id: 4,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 28,
    image: produto04,
  },
  {
    id: 5,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 18,
    image: produto05,
  },
  {
    id: 6,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 55,
    image: produto06,
  },
  {
    id: 7,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 37,
    image: produto07,
  },
  {
    id: 8,
    name: "Lorem Ipsum",
    description: "Redesigned from scratch and completely revised.",
    price: 22,
    image: produto08,
  },
];
