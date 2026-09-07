"use client";

import Header from "@/components/Header";
import NFTCard from "@/components/NFTCard";
import { products } from "@/data/products";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {products.map((product) => (
            <NFTCard
              key={product.id}
              imageSrc={product.image}
              name={product.name}
              description={product.description}
              price={product.price}
              onBuy={() => alert(`Comprado: ${product.name} por ${product.price} ETH`)}
            />
          ))}
        </div>
      </main>
    </>
  );
}

