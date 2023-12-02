import { useContext } from 'react';
import PropTypes from 'prop-types';
import CartViewContext from '../contexts/CartViewContext';
import CartContext from '../contexts/CartContext';
import getPrice from '../helpers/generatePriceFromId';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { IoMdClose } from 'react-icons/io';

function ProductCard({ product, qty }) {
  const cartView = useContext(CartViewContext);
  const { dispatch } = useContext(CartContext);
  return (
    <div
      className={
        !cartView
          ? 'flex max-w-[490px] flex-col gap-4 rounded-md bg-white p-3 shadow-3xl md:p-5'
          : 'relative grid grid-cols-[auto_1fr] gap-4 rounded-md bg-white p-3 shadow-3xl'
      }>
      {cartView && qty && (
        <button
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
          data-testid="remove-from-cart"
          onClick={() =>
            dispatch({ type: 'removed_from_cart', id: product.id })
          }>
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
      <Link className={!cartView ? '' : 'mr-6'} to={`/shop/${product.id}`}>
        <h3
          className={
            !cartView ? 'text-2xl font-bold md:h-16' : 'text-xl font-bold'
          }>
          {product.name}
        </h3>
      </Link>
      <p
        className={
          !cartView
            ? 'text-lg text-red-600'
            : 'self-center text-lg text-red-600'
        }>
        ${getPrice(product.id)}
      </p>
      <div className="col-span-2 md:col-span-1">
        <AddToCartButton product={product} qty={qty} />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  qty: PropTypes.number
};
export default ProductCard;
