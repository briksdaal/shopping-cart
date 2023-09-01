import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function Products({ data }) {
  const products = data?.results;
  if (!products || !products.length)
    return <h2>Sorry, this seems to be empty</h2>;

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

Products.propTypes = {
  data: PropTypes.object
};
export default Products;
