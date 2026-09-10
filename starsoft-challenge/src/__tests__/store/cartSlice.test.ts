import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartCount,
  selectCartTotal,
  CartState,
} from "@/store/cartSlice";

const empty: CartState = { items: [] };

const item = { id: 1, name: "NFT A", description: "desc", price: 20, image: "/a.png" };

describe("cartSlice", () => {
  it("adiciona item ao carrinho", () => {
    const state = cartReducer(empty, addToCart(item));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("incrementa quantidade ao adicionar item duplicado", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, addToCart(item));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("remove item do carrinho", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, removeFromCart(1));
    expect(state.items).toHaveLength(0);
  });

  it("aumenta quantidade", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, increaseQuantity(1));
    expect(state.items[0].quantity).toBe(2);
  });

  it("diminui quantidade", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, increaseQuantity(1));
    state = cartReducer(state, decreaseQuantity(1));
    expect(state.items[0].quantity).toBe(1);
  });

  it("remove item ao diminuir quantidade abaixo de 1", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, decreaseQuantity(1));
    expect(state.items).toHaveLength(0);
  });

  it("limpa o carrinho", () => {
    let state = cartReducer(empty, addToCart(item));
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
  });

  it("selectCartCount retorna total de unidades", () => {
    const state = { cart: { items: [{ ...item, quantity: 3 }] } };
    expect(selectCartCount(state)).toBe(3);
  });

  it("selectCartTotal calcula valor corretamente", () => {
    const state = { cart: { items: [{ ...item, quantity: 2 }] } };
    expect(selectCartTotal(state)).toBe(40);
  });
});
