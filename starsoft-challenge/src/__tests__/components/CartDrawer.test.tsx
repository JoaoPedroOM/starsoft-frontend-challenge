import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "@/store/cartSlice";
import CartDrawer from "@/components/CartDrawer";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    aside: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <aside {...p}>{children}</aside>,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string | { src: string }; alt: string }) => {
    const s = typeof src === "object" ? src.src : src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={s} alt={alt} />;
  },
}));

jest.mock("@/assets/icons/Arrow - Left.svg", () => "arrow.svg");
jest.mock("@/assets/icons/Delete.svg", () => "delete.svg");
jest.mock("@/assets/images/ETH.png", () => "eth.png");
jest.mock("@/components/CartDrawer/styles.module.scss", () => ({}));
jest.mock("@/components/Button/styles.module.scss", () => ({ button: "button", fullWidth: "fullWidth" }));

const item = { id: 1, name: "NFT Raro", description: "Edição limitada", price: 20, image: "/nft.png" };

function renderDrawer(isOpen: boolean, items: typeof item[] = []) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  items.forEach((i) => store.dispatch(addToCart(i)));
  const onClose = jest.fn();
  render(
    <Provider store={store}>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </Provider>
  );
  return { store, onClose };
}

describe("CartDrawer", () => {
  it("não renderiza quando fechado", () => {
    renderDrawer(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renderiza o drawer quando aberto", () => {
    renderDrawer(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Mochila de Compras")).toBeInTheDocument();
  });

  it("exibe mensagem de carrinho vazio", () => {
    renderDrawer(true);
    expect(screen.getByText("Sua mochila está vazia.")).toBeInTheDocument();
  });

  it("exibe itens do carrinho", () => {
    renderDrawer(true, [item]);
    expect(screen.getByText("NFT Raro")).toBeInTheDocument();
  });

  it("exibe o total quando há itens", () => {
    renderDrawer(true, [item]);
    expect(screen.getByText("TOTAL")).toBeInTheDocument();
    expect(screen.getByLabelText("Valor total: 20 Ethereum")).toBeInTheDocument();
  });

  it("remove item ao clicar no botão deletar", () => {
    const { store } = renderDrawer(true, [item]);
    fireEvent.click(screen.getByRole("button", { name: /Remover NFT Raro/i }));
    expect(store.getState().cart.items).toHaveLength(0);
  });

  it("chama onClose ao clicar no botão de fechar", () => {
    const { onClose } = renderDrawer(true);
    fireEvent.click(screen.getByRole("button", { name: /Fechar mochila/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("incrementa quantidade ao clicar em '+'", () => {
    const { store } = renderDrawer(true, [item]);
    fireEvent.click(screen.getByRole("button", { name: /Aumentar quantidade/i }));
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });
});
