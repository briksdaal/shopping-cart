import { Outlet } from 'react-router-dom';
import { useState, useRef } from 'react';
import CacheContext from './contexts/CacheContext';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const cacheRef = useRef({});
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
      <CacheContext.Provider value={cacheRef}>
        <main className="relative z-0 mt-20 flex grow justify-center">
          <Outlet context={{ cartItems, updateCartItemQty }} />
        </main>
      </CacheContext.Provider>
      <Footer />
    </>
  );
}

export default App;
