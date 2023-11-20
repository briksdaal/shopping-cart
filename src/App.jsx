import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const numOfItemsInCart = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  function updateCartItemQty(product) {
    return (qty) =>
      setCartItems((currentCart) => {
        if (qty === 0) {
          return currentCart.filter((item) => item.id !== product.id);
        } else if (currentCart.find((item) => item.id === product.id)) {
          return currentCart.map((item) =>
            item.id === product.id ? { ...item, qty } : item
          );
        } else {
          return [
            ...currentCart,
            {
              id: product.id,
              name: product.name,
              background_image: product.background_image,
              qty: 1
            }
          ];
        }
      });
  }

  return (
    <>
      <Header numOfItemsInCart={numOfItemsInCart} />
      <main className="flex grow justify-center">
        <Outlet context={{ cartItems, updateCartItemQty }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
