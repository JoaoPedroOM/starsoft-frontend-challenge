import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

jest.useFakeTimers();

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock("@/assets/images/ETH.png", () => "eth.png");
jest.mock("@/components/ProductGrid/styles.module.scss", () => ({}));
jest.mock("@/components/NFTCard/styles.module.scss", () => ({}));
jest.mock("@/components/Button/styles.module.scss", () => ({ button: "button", fullWidth: "fullWidth" }));

const mockProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `NFT ${i + 1}`,
  description: `Desc ${i + 1}`,
  price: 10,
  image: { src: `/img${i}.png`, height: 200, width: 200 } as unknown as import("next/image").StaticImageData,
}));

function renderGrid(props = {}) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(
    <Provider store={store}>
      <ProductGrid initialProducts={mockProducts} batchSize={4} maxProducts={12} {...props} />
    </Provider>
  );
}

describe("ProductGrid", () => {
  it("renderiza a quantidade inicial de cards", () => {
    renderGrid();
    expect(screen.getAllByRole("article")).toHaveLength(4);
  });

  it("exibe o botão de carregar mais", () => {
    renderGrid();
    expect(screen.getByRole("button", { name: /Carregar mais/i })).toBeInTheDocument();
  });

  it("carrega mais itens ao clicar no botão", async () => {
    renderGrid();
    fireEvent.click(screen.getByRole("button", { name: /Carregar mais/i }));
    act(() => { jest.advanceTimersByTime(300); });
    await waitFor(() => expect(screen.getAllByRole("article").length).toBeGreaterThan(4));
  });

  it("exibe 'Você já viu tudo' quando maxProducts é atingido", () => {
    renderGrid({ batchSize: 4, maxProducts: 4 });
    expect(screen.getByText("Você já viu tudo")).toBeInTheDocument();
  });
});
