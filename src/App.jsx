import { Outlet } from 'react-router-dom';
import { useReducer, useRef, useMemo } from 'react';
import CacheContext from './contexts/CacheContext';
import CartContext from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import cartReducer from './helpers/cartReducer';

function App() {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const cacheRef = useRef({});

  const numOfItemsInCart = useMemo(
    () => cartItems.reduce((acc, cur) => acc + cur.qty, 0),
    [cartItems]
  );

  return (
    <>
      <Header numOfItemsInCart={numOfItemsInCart} />
      <CacheContext.Provider value={cacheRef}>
        <CartContext.Provider value={{ cartItems, dispatch }}>
          <main className="relative z-0 mt-20 flex grow justify-center">
            <Outlet />
          </main>
        </CartContext.Provider>
      </CacheContext.Provider>
      <Footer />
    </>
  );
}

export default App;
