import PropTypes from 'prop-types';
import getPrice from '../helpers/generatePriceFromId';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product, qty, onChange }) {
  return (
    <div>
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.background_image}
          alt={product.name}
          width={300}
          height={200}
        />
        <h3>{product.name}</h3>
      </Link>
      <p>{getPrice(product.id)}</p>
      <AddToCartButton qty={qty} onChange={onChange} />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  qty: PropTypes.number,
  onChange: PropTypes.func
};
export default ProductCard;
