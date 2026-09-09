"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import ethIcon from "@/assets/images/ETH.png";
import { addToCart } from "@/store/cartSlice";
import Button from "@/components/Button";
import { ImageSource } from "@/types";
import styles from "./styles.module.scss";

export interface NFTCardProps {
  id: number;
  imageSrc?: ImageSource;
  name?: string;
  description?: string;
  price?: number;
}

const NFTCard = ({
  id,
  imageSrc,
  name = "Lorem Ipsum",
  description = "Redesigned from scratch and completely revised.",
  price = 32,
}: NFTCardProps) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(
      addToCart({
        id,
        name,
        description,
        price,
        image: imageSrc ?? "",
      })
    );
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={200}
            height={200}
            className={styles.nftImage}
          />
        ) : (
          <div className={styles.nftImage} />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.priceWrapper}>
        <Image
          src={ethIcon}
          alt="Ethereum Icon"
          width={29}
          height={29}
          className={styles.ethIcon}
        />
        <span className={styles.price}>{price} ETH</span>
      </div>

      <Button onClick={handleBuy}>
        COMPRAR
      </Button>
    </article>
  );
};

export default NFTCard;