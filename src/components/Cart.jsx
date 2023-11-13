import { Link, useOutletContext } from 'react-router-dom';
import getPrice from '../helpers/generatePriceFromId';
import Products from './Products';

function Cart() {
  const globalCart = useOutletContext();

  const totalCartSum = +globalCart.cartItems
    .reduce((acc, cur) => acc + getPrice(cur.id) * cur.qty, 0)
    .toFixed(2);

  return (
    <div>
      <h2>Your Cart</h2>
      <Products
        data={{ results: globalCart.cartItems }}
        globalCart={globalCart}
      />
      {totalCartSum !== 0 && (
        <div>
          <h3>Total Sum: ${totalCartSum}</h3>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
