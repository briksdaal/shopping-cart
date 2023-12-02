import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../contexts/CartContext';
import CartViewContext from '../contexts/CartViewContext';
import Title from './Title';
import getPrice from '../helpers/generatePriceFromId';
import Products from './Products';

function Cart() {
  const { cartItems } = useContext(CartContext);

  const totalCartSum = +cartItems
    .reduce((acc, cur) => acc + getPrice(cur.id) * cur.qty, 0)
    .toFixed(2);

  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="m-4 my-12 w-full max-w-screen-xl md:my-16">
        <Title>Your Cart</Title>
        <div className="flex flex-col gap-16 lg:flex-row">
          <CartViewContext.Provider value={true}>
            <Products data={{ results: cartItems }} />
          </CartViewContext.Provider>
          {totalCartSum !== 0 && (
            <div className="flex-1">
              <h3 className="mb-4 text-2xl">Total Sum: ${totalCartSum}</h3>
              <Link
                to="/checkout"
                className="rounded-md bg-blue-700 px-6 py-2 text-lg text-white hover:bg-blue-400">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
