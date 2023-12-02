import PropTypes from 'prop-types';
import { useContext } from 'react';
import CartContext from '../contexts/CartContext';

function AddToCartButton({ qty = 0, product }) {
  const { dispatch } = useContext(CartContext);

  function onAddToCart() {
    dispatch({ type: 'added_to_cart', product });
  }

  function onIncrement() {
    dispatch({ type: 'incremented', id: product.id });
  }

  function onDecrement() {
    if (qty === 1) {
      dispatch({ type: 'removed_from_cart', id: product.id });
    } else {
      dispatch({ type: 'decremented', id: product.id });
    }
  }

  return (
    <div className="h-12">
      {qty > 0 ? (
        <>
          <button
            className="my-1 ml-0 mr-1 inline-flex w-9 justify-center rounded-3xl bg-blue-700 px-5 py-1 text-2xl text-white hover:bg-blue-400 md:mr-3"
            onClick={onDecrement}>
            -
          </button>
          <span className="px-4 text-xl">Quantity: {qty}</span>
          <button
            className="mx-1 my-1 inline-flex w-9 justify-center rounded-3xl bg-blue-700 px-5 py-1 text-2xl text-white hover:bg-blue-400 md:mx-3"
            onClick={onIncrement}>
            +
          </button>
        </>
      ) : (
        <button
          className="rounded-md bg-blue-700 px-6 py-2 text-lg text-white hover:bg-blue-400"
          onClick={onAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

AddToCartButton.propTypes = {
  qty: PropTypes.number,
  product: PropTypes.object
};

export default AddToCartButton;
