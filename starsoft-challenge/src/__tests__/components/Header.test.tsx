import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "@/store/cartSlice";
import Header from "@/components/Header";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...p }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...p}>{children}</div>,
    aside: ({ children, ...p }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => <aside {...p}>{children}</aside>,
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, priority: _p, ...rest }: { src: string | { src: string }; alt: string; priority?: boolean; [k: string]: unknown }) => {
    const s = typeof src === "object" ? (src as { src: string }).src : src;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={s} alt={alt} {...rest} />;
  },
}));

jest.mock("@/assets/images/logo.png", () => ({ src: "logo.png" }));
jest.mock("@/assets/icons/Bag.svg", () => "bag.svg");
jest.mock("@/assets/icons/Arrow - Left.svg", () => "arrow.svg");
jest.mock("@/assets/icons/Delete.svg", () => "delete.svg");
jest.mock("@/assets/images/ETH.png", () => "eth.png");
jest.mock("@/components/Header/styles.module.scss", () => ({}));
jest.mock("@/components/CartDrawer/styles.module.scss", () => ({}));
jest.mock("@/components/Button/styles.module.scss", () => ({ button: "button", fullWidth: "fullWidth" }));

function renderHeader(preload: Parameters<typeof addToCart>[0][] = []) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  preload.forEach((i) => store.dispatch(addToCart(i)));
  render(<Provider store={store}><Header /></Provider>);
  return store;
}

describe("Header", () => {
  it("renderiza o logo", () => {
    renderHeader();
    expect(screen.getByAltText("Logo Starsoft")).toBeInTheDocument();
  });

  it("exibe contagem 0 quando carrinho vazio", () => {
    renderHeader();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("exibe a contagem correta de itens", () => {
    renderHeader([
      { id: 1, name: "A", description: "d", price: 10, image: "/a.png" },
      { id: 2, name: "B", description: "d", price: 5, image: "/b.png" },
    ]);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("abre o CartDrawer ao clicar no botão", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /Abrir carrinho/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("fecha o CartDrawer ao clicar em fechar", () => {
    renderHeader();
    fireEvent.click(screen.getByRole("button", { name: /Abrir carrinho/i }));
    fireEvent.click(screen.getByRole("button", { name: /Fechar mochila/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
