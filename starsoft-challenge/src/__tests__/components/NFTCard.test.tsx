import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";
import NFTCard from "@/components/NFTCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : "mock"} alt={alt} />
  ),
}));

jest.mock("@/assets/images/ETH.png", () => "eth.png");
jest.mock("@/components/NFTCard/styles.module.scss", () => ({}));
jest.mock("@/components/Button/styles.module.scss", () => ({
  button: "button",
  fullWidth: "fullWidth",
}));

function renderCard(props = {}) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  const defaults = { id: 1, name: "NFT Teste", description: "Desc", price: 10 };
  render(
    <Provider store={store}>
      <NFTCard {...defaults} {...props} />
    </Provider>
  );
  return store;
}

describe("NFTCard", () => {
  it("exibe nome e preço", () => {
    renderCard();
    expect(screen.getByText("NFT Teste")).toBeInTheDocument();
    expect(screen.getByText("10 ETH")).toBeInTheDocument();
  });

  it("exibe o botão de comprar", () => {
    renderCard();
    expect(screen.getByRole("button", { name: /Comprar NFT/i })).toBeInTheDocument();
  });

  it("adiciona item ao carrinho ao clicar em comprar", () => {
    const store = renderCard();
    fireEvent.click(screen.getByRole("button", { name: /Comprar NFT/i }));
    expect(store.getState().cart.items).toHaveLength(1);
  });

  it("usa valores padrão quando props são omitidas", () => {
    renderCard({ id: 2, name: undefined, price: undefined });
    expect(screen.getByText("Lorem Ipsum")).toBeInTheDocument();
    expect(screen.getByText("32 ETH")).toBeInTheDocument();
  });
});
