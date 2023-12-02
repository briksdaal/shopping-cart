import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import CartContext from '../contexts/CartContext';
import CartViewContext from '../contexts/CartViewContext';
import { useContext } from 'react';

function Products({ data, numOfProductsToShow }) {
  const { cartItems, updateCartItemQty } = useContext(CartContext);
  const cartView = useContext(CartViewContext);
  let products = data?.results;
  if (!products || !products.length)
    return <h2 className="text-lg">This seems to be empty...</h2>;

  if (numOfProductsToShow) products = products.slice(0, numOfProductsToShow);

  return (
    <div
      className={
        !cartView
          ? 'flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-8'
          : 'flex flex-1 flex-col gap-8'
      }>
      {products.map((p) => {
        const qty = cartItems.find((item) => item.id === p.id)?.qty;
        const onChange = updateCartItemQty(p);
        return (
          <ProductCard key={p.id} product={p} qty={qty} onChange={onChange} />
        );
      })}
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.object,
  numOfProductsToShow: PropTypes.number
};
export default Products;
