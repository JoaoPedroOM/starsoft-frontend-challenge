"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import bag from "../../assets/icons/Bag.svg";
import { selectCartCount } from "@/store/cartSlice";
import CartDrawer from "@/components/CartDrawer";
import styles from "./styles.module.scss";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useSelector(selectCartCount);

  return (
    <>
      <header className={styles.header} role="banner">
        <Image
          src={logo}
          alt="Logo Starsoft"
          width={101}
          height={38}
          priority
        />
        <div className={styles.cartContainer}>
          <button
            type="button"
            className={styles.cartButton}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Abrir carrinho de compras, ${cartCount} ${cartCount === 1 ? "item adicionado" : "itens adicionados"
              }`}
            aria-haspopup="dialog"
            aria-expanded={isCartOpen}
          >
            <Image src={bag} alt="" aria-hidden="true" width={24} height={24} />
            <p aria-hidden="true">{cartCount}</p>
          </button>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
