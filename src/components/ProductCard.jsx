import PropTypes from 'prop-types';
import getPrice from '../helpers/generatePriceFromId';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product, qty, onChange }) {
  return (
    <div className="shadow-3xl flex flex-col gap-4 rounded-md bg-white p-5">
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.background_image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
      </Link>
      <Link to={`/shop/${product.id}`}>
        <h3 className="h-16 text-2xl font-bold">{product.name}</h3>
      </Link>
      <p className="text-lg text-red-600">${getPrice(product.id)}</p>
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
