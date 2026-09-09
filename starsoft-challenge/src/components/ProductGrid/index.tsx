"use client";

import { useState, useCallback } from "react";
import NFTCard from "@/components/NFTCard";
import { products } from "@/data/products";
import { Product, DisplayProduct } from "@/types";
import styles from "./styles.module.scss";

export interface ProductGridProps {
  initialProducts?: Product[];
  batchSize?: number;
  maxProducts?: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createShuffledBatch(
  source: Product[],
  batchIndex: number,
  size: number
): DisplayProduct[] {
  return shuffleArray(source)
    .slice(0, size)
    .map((item) => ({
      ...item,
      uniqueKey: `${item.id}-batch${batchIndex}`,
    }));
}

export default function ProductGrid({
  initialProducts = products,
  batchSize = 8,
  maxProducts = 32,
}: ProductGridProps) {
  const [items, setItems] = useState<DisplayProduct[]>(() =>
    initialProducts.slice(0, batchSize).map((item) => ({
      ...item,
      uniqueKey: `${item.id}-batch0`,
    }))
  );
  const [batchCount, setBatchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isCompleted = items.length >= maxProducts;
  const progressPercent = Math.min(
    Math.round((items.length / maxProducts) * 100),
    100
  );

  const handleLoadMore = useCallback(() => {
    if (isLoading || items.length >= maxProducts) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextBatchIndex = batchCount + 1;
      const nextBatch = createShuffledBatch(
        initialProducts,
        nextBatchIndex,
        batchSize
      );

      setBatchCount(nextBatchIndex);
      setItems((prev) => [...prev, ...nextBatch]);
      setIsLoading(false);
    }, 300);
  }, [isLoading, items.length, maxProducts, batchCount, initialProducts, batchSize]);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {items.map((product) => (
          <NFTCard
            key={product.uniqueKey}
            id={product.id}
            imageSrc={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>

      <div className={styles.loadSection}>
        <div
          className={styles.progressBarTrack}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso de produtos visualizados"
        >
          <div
            className={styles.progressBarFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isCompleted ? (
          <div className={styles.completedBox} aria-live="polite">
            Você já viu tudo
          </div>
        ) : (
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleLoadMore}
            disabled={isLoading}
            aria-label="Carregar mais produtos"
          >
            {isLoading ? "Carregando..." : "Carregar mais"}
          </button>
        )}
      </div>
    </section>
  );
}