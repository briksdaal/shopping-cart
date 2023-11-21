import { Link, useOutletContext } from 'react-router-dom';
import Title from './Title';
import getPrice from '../helpers/generatePriceFromId';
import Products from './Products';

function Cart() {
  const globalCart = useOutletContext();

  const totalCartSum = +globalCart.cartItems
    .reduce((acc, cur) => acc + getPrice(cur.id) * cur.qty, 0)
    .toFixed(2);

  return (
    <div className="flex w-full justify-center bg-sky-50">
      <div className="my-16 w-full max-w-screen-xl">
        <Title>Your Cart</Title>
        <div className="flex gap-16">
          <Products
            data={{ results: globalCart.cartItems }}
            globalCart={globalCart}
            cartView={true}
          />
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
