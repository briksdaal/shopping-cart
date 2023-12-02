export default function (cartItems, action) {
  switch (action.type) {
    case 'added_to_cart': {
      return [
        ...cartItems,
        {
          id: action.product.id,
          name: action.product.name,
          background_image: action.product.background_image,
          qty: 1
        }
      ];
    }
    case 'incremented': {
      return cartItems.map((item) =>
        item.id === action.id ? { ...item, qty: item.qty + 1 } : item
      );
    }
    case 'decremented': {
      return cartItems.map((item) =>
        item.id === action.id ? { ...item, qty: item.qty - 1 } : item
      );
    }
    case 'removed_from_cart': {
      return cartItems.filter((item) => item.id !== action.id);
    }
  }
}
