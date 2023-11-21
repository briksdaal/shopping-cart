import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function Products({ data, globalCart, numOfProductsToShow, cartView }) {
  let products = data?.results;
  if (!products || !products.length)
    return <h2 className="text-lg">This seems to be empty...</h2>;

  if (numOfProductsToShow) products = products.slice(0, numOfProductsToShow);

  return (
    <div
      className={
        !cartView ? 'grid grid-cols-3 gap-16' : 'flex flex-1 flex-col gap-8'
      }>
      {products.map((p) => {
        const qty = globalCart.cartItems.find((item) => item.id === p.id)?.qty;
        const onChange = globalCart.updateCartItemQty(p);
        return (
          <ProductCard
            key={p.id}
            product={p}
            qty={qty}
            onChange={onChange}
            cartView={cartView}
          />
        );
      })}
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.object,
  globalCart: PropTypes.object,
  numOfProductsToShow: PropTypes.number,
  cartView: PropTypes.bool
};
export default Products;
