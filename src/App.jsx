import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);

  function updateCartItemQty(product) {
    return (qty) =>
      setCartItems((currentCart) => {
        if (qty === 0) {
          return currentCart.filter((item) => item.id !== product.id);
        }

        if (currentCart.find((item) => item.id === product.id)) {
          return currentCart.map((item) => {
            if (item.id === product.id) {
              return { ...item, qty };
            }
            return item;
          });
        }

        return [
          ...currentCart,
          {
            id: product.id,
            name: product.name,
            background_image: product.background_image,
            qty: 1
          }
        ];
      });
  }

  return (
    <>
      <Header />
      <Cart cartItems={cartItems} />
      <main>
        <Outlet context={{ cartItems, updateCartItemQty }} />
      </main>
      <Footer />
    </>
  );
}

export default App;
