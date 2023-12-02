import { createContext } from 'react';

const CartContext = createContext({
  cartItems: [],
  updateCartItemQty: () => {}
});

export default CartContext;
