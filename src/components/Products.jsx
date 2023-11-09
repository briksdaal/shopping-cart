import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function Products({ data, globalCart }) {
  const products = data?.results;
  if (!products || !products.length)
    return <h2>Sorry, this seems to be empty</h2>;

  return (
    <div>
      {products.map((p) => {
        const qty = globalCart.cartItems.find((item) => item.id === p.id)?.qty;
        const onChange = globalCart.updateCartItemQty(p);
        return (
          <ProductCard key={p.id} product={p} qty={qty} onChange={onChange} />
        );
      })}
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.object,
  globalCart: PropTypes.object
};
export default Products;
