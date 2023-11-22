import PropTypes from 'prop-types';

function AddToCartButton({ qty = 0, onChange, cartView }) {
  function onIncrement() {
    onChange(qty + 1);
  }

  function onDecrement() {
    onChange(qty - 1);
  }

  return (
    <div className="h-12">
      {qty > 0 ? (
        <>
          <button
            className={`${
              cartView ? 'ml-0' : ''
            } mx-1 my-1 ml-0 inline-flex w-9 justify-center rounded-3xl bg-blue-700 px-5 py-1 text-2xl text-white hover:bg-blue-400 md:mx-3 lg:ml-3`}
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
          onClick={onIncrement}>
          Add to Cart
        </button>
      )}
    </div>
  );
}

AddToCartButton.propTypes = {
  qty: PropTypes.number,
  onChange: PropTypes.func,
  cartView: PropTypes.bool
};

export default AddToCartButton;
