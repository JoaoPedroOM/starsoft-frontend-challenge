"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";
import arrowLeft from "@/assets/icons/Arrow - Left.svg";
import deleteIcon from "@/assets/icons/Delete.svg";
import ethIcon from "@/assets/images/ETH.png";
import Button from "@/components/Button";
import styles from "./styles.module.scss";

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.drawerHeader}>
              <button
                type="button"
                className={styles.backButton}
                onClick={onClose}
                aria-label="Fechar mochila de compras"
              >
                <Image src={arrowLeft} alt="" aria-hidden="true" width={20} height={20} />
              </button>
              <h2 id="cart-drawer-title" className={styles.drawerTitle}>
                Mochila de Compras
              </h2>
            </div>

            <div className={styles.itemsList} aria-label="Lista de itens no carrinho">
              {items.length === 0 ? (
                <p className={styles.emptyMessage} role="status">
                  Sua mochila está vazia.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.image}
                        alt={`Arte digital NFT: ${item.name}`}
                        width={130}
                        height={130}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      <p className={styles.itemDescription}>{item.description}</p>
                      <div className={styles.itemPrice}>
                        <Image
                          src={ethIcon}
                          alt=""
                          aria-hidden="true"
                          width={20}
                          height={20}
                          className={styles.ethIcon}
                        />
                        <span aria-label={`Preço unitário: ${item.price} Ethereum`}>
                          {item.price} ETH
                        </span>
                      </div>
                      <div className={styles.quantityControls}>
                        <div
                          className={styles.quantityBtns}
                          role="group"
                          aria-label={`Quantidade de ${item.name}`}
                        >
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                          >
                            −
                          </button>
                          <span
                            className={styles.qty}
                            aria-label={`Quantidade atual: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => dispatch(removeFromCart(item.id))}
                          aria-label={`Remover ${item.name} da mochila`}
                        >
                          <Image src={deleteIcon} alt="" aria-hidden="true" width={18} height={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.drawerFooter}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>TOTAL</span>
                  <div
                    className={styles.totalValue}
                    aria-label={`Valor total: ${total} Ethereum`}
                  >
                    <Image src={ethIcon} alt="" aria-hidden="true" width={24} height={24} />
                    <span>{total} ETH</span>
                  </div>
                </div>
                <Button aria-label="Finalizar compra dos itens na mochila">
                  FINALIZAR COMPRA
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
