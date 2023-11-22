import PropTypes from 'prop-types';
import getPrice from '../helpers/generatePriceFromId';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { IoMdClose } from 'react-icons/io';

function ProductCard({ product, qty, onChange, cartView }) {
  return (
    <div
      className={
        !cartView
          ? 'flex max-w-[490px] flex-col gap-4 rounded-md bg-white p-3 shadow-3xl md:p-5'
          : 'relative flex flex-col gap-4 rounded-md bg-white p-3 shadow-3xl md:grid md:grid-cols-[auto_1fr]'
      }>
      {cartView && qty && (
        <button
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
          data-testid="remove-from-cart"
          onClick={() => onChange(0)}>
          <IoMdClose />
        </button>
      )}
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.background_image}
          alt={product.name}
          className={
            !cartView
              ? 'h-32 w-full object-cover sm:h-64'
              : 'h-16 w-32 object-cover'
          }
        />
      </Link>
      <Link to={`/shop/${product.id}`}>
        <h3
          className={
            !cartView ? 'text-2xl font-bold md:h-16' : 'mr-6 text-xl font-bold'
          }>
          {product.name}
        </h3>
      </Link>
      <p
        className={
          !cartView
            ? 'text-lg text-red-600'
            : 'text-lg text-red-600 md:self-center'
        }>
        ${getPrice(product.id)}
      </p>
      <div>
        <AddToCartButton qty={qty} onChange={onChange} cartView={cartView} />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  qty: PropTypes.number,
  onChange: PropTypes.func,
  cartView: PropTypes.bool
};
export default ProductCard;
