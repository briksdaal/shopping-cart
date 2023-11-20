import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function Products({ data, globalCart, numOfProductsToShow }) {
  let products = data?.results;
  if (!products || !products.length)
    return <h2>Sorry, this seems to be empty</h2>;

  if (numOfProductsToShow) products = products.slice(0, numOfProductsToShow);

  return (
    <div className="grid grid-cols-3 gap-16">
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
  globalCart: PropTypes.object,
  numOfProductsToShow: PropTypes.number
};
export default Products;
