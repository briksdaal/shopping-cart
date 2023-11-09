import PropTypes from 'prop-types';
import getPrice from '../helpers/generatePriceFromId';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product }) {
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
      <AddToCartButton />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object
};
export default ProductCard;
