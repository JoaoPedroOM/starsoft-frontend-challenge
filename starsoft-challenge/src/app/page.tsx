"use client";

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <ProductGrid />
      </main>
    </>
  );
}

